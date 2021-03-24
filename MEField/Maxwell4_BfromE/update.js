
// 更新Particle
function MoveParticleByE(P,E,dt)
{
	rowNum = E.length;
	colNum = E[0].length;
	for(var i=0;i<P.length;i++)
	{
		var px = P[i].x;
		var py = P[i].y;
		var r = round(px)%rowNum;
		var c = round(py)%colNum;
		var evec = E[r][c];

		px += evec.x*dt;
		py += evec.y*dt;
		if(i==10)
		{
			//print("ex:"+evec.x + " ey:" + evec.y + " px:" + px + " py:" + py);
		}
		
		if(evec.mag()<0.0001)
		{
			px = random(0,w);
			py = random(0,h);
		}

		//px+= 0.1;
		//py +=0.1;
		if(px>rowNum)
		{
			px-=rowNum;
		}
		if(px<0)
		{
			px+= rowNum;
		}
		if(py>colNum)
		{
			py-=colNum;
		}
		if(py<0)
		{
			py+=colNum;
		}
		P[i].x = px;
		P[i].y = py;
	}
	return P;
}

function Step(dt)
{
	E = StepEbyB(dt,k,BSum,E,EDelta);

	BDelta = CalDBbyE(E,BDelta,s);
	BFromE = AddValueArray(BFromE,BDelta,1,dt);
	BSum = AddValueArray(B0,BFromE,1,1);

	B0 = StepB2(B0);
	//BSum = StepBbyE(dt,s,E,B0,BSum,BFromE,BDelta);
}

function StepEbyB(dt,k,B,E,EDelta)
{
	EDelta = CalDEbyB(B,EDelta,k);
	E = AddVectorArray(E,EDelta,1,dt);
	return E;
}

function StepBbyE(dt,s,E,B0,BSum,BFromE,BDelta)
{
	BDelta = CalDBbyE(E,BDelta,s);
	BFromE = AddValueArray(BFromE,BDelta,1,dt);
	BSum = AddValueArray(B0,BFromE,1,1);
	return BSum;
}

function CalDBbyE(E, DB, s)
{
	var dEYDX = DifferentiateAYX(E);
	var dEXDY = DifferentiateAXY(E);
	var DB = AddValueArray(dEYDX,dEXDY,-s,s);
	return DB;
}

// 计算E的改变量Delta of E
var DeMax = 0.1;
function CalDEbyB(B, DE, k)
{
	var dBdX = DifferentiateX(B);
	var dBdY = DifferentiateY(B);

	for(var c = 1;c<DE.length-1;c++)
	{
		for(var r =1;r<DE[c].length-1;r++)
		{			
			var dEx = dBdY[c][r]*k;
			var dEy = -dBdX[c][r]*k;	
			var DeVec = createVector(dEx,dEy);
			DeVec.limit(DeMax);	
			DE[c][r] = 	DeVec;	
		}
	}
	return DE;
}

// update B
function StepB(B)
{
	var B2 = CopyArray(B);
	var tNow = GetTimeNow();
	var hc = B.length/2;
	var hr = B[0].length/2;
	for(var c=0;c<B.length;c++)
	{
		for(var r=0;r<B[c].length;r++)
		{
			var c2 = a*(c-hc);
			var r2 = b*(r-hr);
			var radius = sqrt(c2*c2+r2*r2);
			var theta = atan2(r2,c2);
			//B2[c][r] = sin(radius+tNow)*sin(5*theta+tNow);
			
			var S0 = sin(radius+tNow);
			var S1 = sin(3*theta+tNow);
			B2[c][r] = S0*S1;				
			if(c==5&&r==5)
			{
				//print("B[5][5]:" + B2[c][r] + " S0:" + S0 + " S1:"+S1 + " tNow:"+tNow);
			}
		}
	}
	return B2;
}

function StepB2(B)
{
	var B2 = CopyArray(B);
	var tNow = GetTimeNow();
	var hc = B.length/2;
	var hr = B[0].length/2;
	for(var c=0;c<B.length;c++)
	{
		for(var r=0;r<B[c].length;r++)
		{
			var c2 = a*(c-hc);
			var r2 = b*(r-hr);
			var radius = 2.5*sqrt(c2*c2+r2*r2);
			var theta = atan2(r2,c2);
			//B2[c][r] = sin(radius+tNow)*sin(5*theta+tNow);
			
			var S0 = sin(radius);
			var S1 = sin(1*theta+0.1*tNow);
			B2[c][r] = S0*S1;				
			if(c==5&&r==5)
			{
				//print("B[5][5]:" + B2[c][r] + " S0:" + S0 + " S1:"+S1 + " tNow:"+tNow);
			}
		}
	}
	return B2;
}

// 对E进行更新：
// update E by: E(t+dt) = E(t) + DE(t)*dt;
function StepE(E,DE,dt)
{
	var E2 = CopyArray(E);
	for(var i=0;i<E.length;i++)
	{
		for(var j=0;j<E[i].length;j++)
		{
			var e = E[i][j];
			var de = DE[i][j];
			de.mult(dt);
			e.add(de);
			E2[i][j] = e;
		}
	}
	return E2;
}

function StepE2(E,DE,dt)
{
	var E2 = CopyArray(E);
	for(var i=0;i<E.length;i++)
	{
		for(var j=0;j<E[i].length;j++)
		{
			var e = E[i][j];
			var de = DE[i][j];
			de.mult(5);
			E2[i][j] = de;
		}
	}
	return E2;
}

// 计算矢量场A的x方向微分 dA/dx
function DifferentiateX(A)
{
	var D = CopyArray(A);

	for(var c = 1;c<A.length-1;c++)
	{
		for(var r =1;r<A[c].length-1;r++)
		{
			cL = c-1;
			cR = c+1;

			AL = A[cL][r];
			AR = A[cR][r];

			D[c][r] = AR-AL;
		}
	}
	return D;
}

// 计算矢量场A的y方向微分 dA/dy
function DifferentiateY(A)
{
	var D = CopyArray(A);

	for(var c = 1;c<A.length-1;c++)
	{
		for(var r =1;r<A[c].length-1;r++)
		{
			rU = r-1;
			rB = r+1;

			AU = A[c][rU];
			AB = A[c][rB];

			D[c][r] = AB-AU;
		}
	}
	return D;
}

function DifferentiateAYX(A)
{
	var D = new Array();
	for(var c = 0;c<A.length;c++)
	{
		D[c] = new Array();
		for(var r =0;r<A[c].length;r++)
		{
			var d =0;
			if(c>0&&r>0&&c<A.length-1&&r<A[c].length-1)
			{
				cL = c-1;
				cR = c+1;

				AL = A[cL][r].y;
				AR = A[cR][r].y;

				d = AR-AL;
				
			}
			D[c][r] = d;
		}
	}
	return D;
}

function DifferentiateAXY(A)
{
	var D = new Array();
	for(var c = 0;c<A.length;c++)
	{
		D[c] = new Array();
		for(var r =0;r<A[c].length;r++)
		{
			var d =0;
			if(c>0&&r>0&&c<A.length-1&&r<A[c].length-1)
			{
				rU = r-1;
				rB = r+1;

				AU = A[c][rU].x;
				AB = A[c][rB].x;

				d = AB-AU;
				if(c==5&&r==10)
				{
					//print("D[c][r]:" + d);
				}
			}
			D[c][r] = d;
		}
	}
	return D;
}