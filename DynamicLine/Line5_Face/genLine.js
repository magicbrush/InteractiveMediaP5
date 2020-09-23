// ------------------------ utils ---------------------//
function GetBTN(L,i)
{
	var vt0 = L[i-1];
	var vt2 = L[i+1];
	var T = getTangent(vt0,vt2);
	var N = getNormal(vt0,vt2);
	var Base = L[i];

	var Result = {
		B: L[i],
		T: T,
		N: N
	};

	return Result;
}

function AddBiasToLiN(L,i,bias)
{
	BTN = GetBTN(L,i);
	var P = BTN.B.add(BTN.N.multiply(bias));
	return P;
}

function AddOffsetToLi(L,i,Offset)
{
	BTN = GetBTN(L,i);
	var theta = atan2(BTN.N.y,BTN.N.x);
	var Offset2 = Vector.rotate2D(Offset, theta);
	var P = BTN.B.add(Offset2);
	return P;
}

// ---------------------- gen Line -------------------//
function genLineSin(L, Length,AmpOnL,FreqOnL,PhaseOnL)
{
	var vtNum = L.length;

	var A = AmpOnL * Length;

	var L2 = new Array();

	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var t = i/vtNum;
		var s = A * sin(FreqOnL*t*TWO_PI + PhaseOnL);

		var Offset = N.multiply(s,s,s);
		//var Offset = Vector.randomDirection();
		//Offset = Offset.multiply(10,10,10);
		L2[i] = L[i].add(Offset);
		//print(L2[i]);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineSinSin(L,Length,A,F1,P1, F2,P2)
{
	var vtNum = L.length;

	var Amp = A * Length;

	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var t = i/vtNum;
		var s = Amp * sin(F1*t*TWO_PI + P1) * sin(F2*t*TWO_PI + P2);
		
		var Offset = N.multiply(s);
		var Pos = L[i].add(Offset);

		L2[i] = Pos;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineNoise(L,Length,AmpOnL,FreqOnL,PhaseOnL)
{
	var vtNum = L.length;

	var A = AmpOnL * Length;

	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var t1 = i/vtNum;
		var s1 = A * map(noise(t1*FreqOnL + PhaseOnL),0,1,-1,1);

		var Offset = N.multiply(s1);
		var Base = L[i];
		var P = Base.add(Offset);
		L2[i] = P;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineRand(L,Length,Min,Max,ProbPerVT)
{
	var vtNum = L.length;

	var P = ProbPerVT/vtNum;

	var Bias = new Array();
	for(var i=0;i<vtNum;i++)
	{
		var bias = 0;
		if(random(0,1)<P)
		{
			bias = random(Min,Max);
		}
		Bias[i] = bias;
	}

	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var Offset = N.multiply(Bias[i]);
		var Base = L[i];
		var P = Base.add(Offset);
		L2[i] = P;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;

}


function genLineHalfCirc(L,Length,Radius, YScale)
{
	var vtNum = L.length;
	var Diameter = 2*Radius;

	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var M = 
			lineHalfCirc_GetM(i,L,Length,Diameter,1);

		var Offset = N.multiply(M*Radius*YScale);
		var Base = L[i];
		var P = Base.add(Offset);
		L2[i] = P;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineTriangle(L,Length, Radius, YScale, Pwr)
{
	var Diameter = 2*Radius;

	var vtNum = L.length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var M = 
			lineTriangle_GetM(i,L,Length,Diameter,Pwr);

		var Offset = N.multiply(M*Radius*YScale);
		var Base = L[i];
		var P = Base.add(Offset);
		L2[i] = P;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}

function genLineSaw(L, Length, Radius, YScale, Pwr)
{
	var Diameter = 2*Radius;

	var vtNum = L.length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		BTN =  GetBTN(L,i);
		var M = 
			lineSaw_GetM(i,L,Length,Diameter,Pwr);

		var Offset = BTN.N.multiply(M*Radius*YScale);
		var P = BTN.B.add(Offset);
		L2[i] = P;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineRect(L, Length, Radius, YScale, Portion)
{
	var Diameter = 2*Radius;
	var vtNum = L.length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var M = 
			lineRect_GetM(i,L,Length,Diameter,Portion);
		L2[i] = AddBiasToLiN(L,i,M*Radius*YScale);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineCloud(L, Length, ThetaSpd, ROnLen)
{
	var L2 = new Array();
	L2[0] = L[0];
	var vtNum = L.length;
	for(var i=1;i<vtNum-1;i++)
	{
		var Offset = 
			lineCloud_GetOffset(i,L,Length,ThetaSpd,ROnLen);
		var OFS = new Vector(Offset.x,Offset.y,0);
		var BTN = GetBTN(L,i);
		L2[i] = AddOffsetToLi(L,i,OFS);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineNoiseOffset(L,Length,AmpOnL,FreqOnL,PhaseOnL)
{
	var A = AmpOnL * Length;
	var vtNum = L.length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var t = i/vtNum;
		var bx = A * map(noise(t*FreqOnL + PhaseOnL+10000),0,1,-1,1);
		var by = A * map(noise(t*FreqOnL + PhaseOnL),0,1,-1,1);
		var Offset = new Vector(bx,by,0);
		L2[i] = AddOffsetToLi(L,i,Offset);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineRandomOffset(L,Length,AmpOnL)
{
	var vtNum = L.length;
	var A = AmpOnL * Length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var t = i/vtNum;
		var biasRadius = random(0,A);
		var biasTheta = random(0,TWO_PI);
		var bx = biasRadius*cos(biasTheta);
		var by = biasRadius*sin(biasTheta);
		var Offset = new Vector(bx,by,0);
		L2[i] = AddOffsetToLi(L,i,Offset);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineCloudXY(
	L, Length, ThetaSpdX, ThetaSpdY, ROnLen)
{
	var L2 = new Array();
	L2[0] = L[0];
	var vtNum = L.length;
	for(var i=1;i<vtNum-1;i++)
	{
		var Offset = 
			lineCloud_GetOffsetXY(
				i,L,Length,ThetaSpdX,ThetaSpdY,ROnLen);
		var OFS = new Vector(Offset.x,Offset.y,0);
		L2[i] = AddOffsetToLi(L,i,OFS);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineSinPSin(L,Length,A1,F1,P1,A2, F2,P2)
{
	var vtNum = L.length;
	var Amp1 = A1 * Length;
	var Amp2 = A2 * Length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var t = i/vtNum;
		var s = 
			Amp1 * sin(F1*t*TWO_PI + P1) + 
			Amp2 * sin(F2*t*TWO_PI + P2);

		L2[i] =AddBiasToLiN(L,i,s);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


function genLineSinNoise(L,Length,A,F1,P1,F2,P2)
{
	var vtNum = L.length;
	var Amp = A * Length;
	var L2 = new Array();
	L2[0] = L[0];
	for(var i=1;i<vtNum-1;i++)
	{
		var t = i/vtNum;
		var s = Amp * sin(F1*t*TWO_PI + P1);
		s *= 2*noise(F2*t*TWO_PI + P2)-1;

		L2[i] =AddBiasToLiN(L,i,s);
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}







