// 细胞阵列的更新
var tNow = 0;
var mu = 1;
var epslon = 0.05;
var k = 1;

function Step(dt)
{
	//BNext = StepB_Noise(tNow, B, -1,1, 0.05);
	tNow += dt;
	ENext = StepEByB(dt, E, B, mu, epslon);
	BNext = StepBByE(dt, B, E, k);

	B = CopyCell(BNext);
	E = CopyCell(ENext);
}

function StepB_Noise(tNow, B, Min, Max, scaleF)
{
	var B2 = CopyCell(B);
	for(var c=0;c<B.length;c++)
	{
		for(var r=0;r<B[c].length;r++)
		{
			B2[c][r] = 
				map(noise(c*scaleF+tNow,r*scaleF+tNow),0,1,Min,Max);
		}
	}
	return B2;
}

function StepEByB(dt, E, B, mu,epslon)
{
	var E2 = CopyCell(E);

	var dBdX = DifferentiateX(B);
	var dBdY = DifferentiateY(B);
	var MuEpslon = mu*epslon;
	
	for(var c = 1;c<E.length-1;c++)
	{
		for(var r =1;r<E[c].length-1;r++)
		{
			var ecr = E[c][r];
			var dEx = dBdY[c][r]/MuEpslon;
			var dEy = -dBdX[c][r]/MuEpslon;
			
			ecr.x += dEx*dt;
			ecr.y += dEy*dt;
			E2[c][r] = ecr;
		}
	}
	return E2;
}

function StepBByE(dt, B, E, k)
{
	var B2 = CopyCell(B);

	var dEYdX = DifferentiateYX(E);
	var dEXdY = DifferentiateXY(E);

	for(var c = 1;c<E.length-1;c++)
	{
		for(var r =1;r<E[c].length-1;r++)
		{
			var bcr = B[c][r];
			var DEyOverDx = dEYdX[c][r];
			var DExOverDy = dEXdY[c][r];
			
			bcr += -k*(DEyOverDx - DExOverDy);
			B2[c][r] = bcr;
		}
	}
	return B2;
}

function DifferentiateX(A)
{
	var D = CopyCell(A);

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

function DifferentiateY(A)
{
	var D = CopyCell(A);

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

function DifferentiateYX(V)
{
	var D = CopyCell(V);

	for(var c = 1;c<V.length-1;c++)
	{
		for(var r =1;r<V[c].length-1;r++)
		{
			cL = c-1;
			cR = c+1;

			var VL = V[cL][r].y;
			var VR = V[cR][r].y;

			D[c][r] = VR-VL;
		}
	}
	return D;
}

function DifferentiateXY(V)
{
	var D = CopyCell(V);

	for(var c = 1;c<V.length-1;c++)
	{
		for(var r =1;r<V[c].length-1;r++)
		{
			rU = r-1;
			rB = r+1;

			var VU = V[c][rU].x;
			var VB = V[c][rB].x;

			D[c][r] = VB-VU;
		}
	}
	return D;
}

