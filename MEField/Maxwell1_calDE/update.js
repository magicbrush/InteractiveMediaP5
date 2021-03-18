
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


// 计算E的改变量Delta of E
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
			DE[c][r] = createVector(dEx,dEy);			
		}
	}
	return DE;
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