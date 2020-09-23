

function lineSin(L,Length,AmpOnL,FreqOnL,PhaseOnL)
{
	var vtNum = L.length;

	var A = AmpOnL * Length;

	for(var i=1;i<vtNum;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var s0 = A * sin(FreqOnL*t0*TWO_PI + PhaseOnL);

		var t1 = i/vtNum;
		var s1 = A * sin(FreqOnL*t1*TWO_PI + PhaseOnL);

		var x0 = vt0.x;
		var y0 = vt0.y + s0;
		var x1 = vt1.x;
		var y1 = vt1.y + s1;

		line(x0,y0,x1,y1);
	}
}

function lineSinSin(L,Length,A,F1,P1, F2,P2)
{
	var vtNum = L.length;

	var Amp = A * Length;

	for(var i=1;i<vtNum;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var s0 = Amp * sin(F1*t0*TWO_PI + P1);
		s0 *= sin(F2*t0*TWO_PI + P2);

		var t1 = i/vtNum;
		var s1 = Amp * sin(F1*t1*TWO_PI + P1);
		s1 *= sin(F2*t1*TWO_PI + P2);

		var x0 = vt0.x;
		var y0 = vt0.y + s0;
		var x1 = vt1.x;
		var y1 = vt1.y + s1;

		line(x0,y0,x1,y1);
	}
}



function lineNoise(L,Length,AmpOnL,FreqOnL,PhaseOnL)
{
	var vtNum = L.length;

	var A = AmpOnL * Length;

	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var s0 = A * map(noise(t0*FreqOnL + PhaseOnL),0,1,-1,1);

		var t1 = i/vtNum;
		var s1 = A * map(noise(t1*FreqOnL + PhaseOnL),0,1,-1,1);

		var x0 = vt0.x;
		var y0 = vt0.y + s0;
		var x1 = vt1.x;
		var y1 = vt1.y + s1;

		line(x0,y0,x1,y1);
	}
}

function lineRand(L,Length,Min,Max,ProbPerVT)
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

	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var bias0 = Bias[i-1];
		var bias1 = Bias[i];

		var x0 = vt0.x;
		var y0 = vt0.y + bias0;
		var x1 = vt1.x;
		var y1 = vt1.y + bias1;

		line(x0,y0,x1,y1);
	}

}


function lineHalfCirc(L,Length,Radius, YScale)
{
	var vtNum = L.length;

	var diameter = 2*Radius;

	var vtNum = L.length;
	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];

		var Diameter = 2*Radius;
		var M0 = 
			lineHalfCirc_GetM(i-1,L,Length,Diameter,1);
		var M1 = 
			lineHalfCirc_GetM(i,L,Length,Diameter,1);

		var x0 = vt0.x;
		var y0 = vt0.y + M0 * Radius * YScale;
		var x1 = vt1.x;
		var y1 = vt1.y + M1 * Radius * YScale;

		line(x0,y0,x1,y1);
	}

}

function lineHalfCirc_GetM(i, L, Length, Diameter, Pwr)
{
	var Dist = Length * i/L.length;
	var D = Dist/Diameter;
	var N = (D - floor(D))*2-1;
	var M = pow(sqrt(1 - N*N),Pwr);
	return M;
}


function lineTriangle(L,Length, Radius, YScale, Pwr)
{
	var vtNum = L.length;

	var diameter = 2*Radius;

	var vtNum = L.length;
	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];

		var Diameter = 2*Radius;
		var M0 = 
			lineTriangle_GetM(i-1,L,Length,Diameter,Pwr);
		var M1 = 
			lineTriangle_GetM(i,L,Length,Diameter,Pwr);

		var x0 = vt0.x;
		var y0 = vt0.y + M0 * Radius * YScale;
		var x1 = vt1.x;
		var y1 = vt1.y + M1 * Radius * YScale;

		line(x0,y0,x1,y1);
	}

}

function lineTriangle_GetM(i, L, Length, Diameter, Pwr)
{
	var Dist = Length * i/L.length;
	var D = Dist/Diameter;
	var N = abs((D - floor(D))*2-1);
	var M = pow(N,Pwr);
	return M;
}


function lineSaw(L, Length, Radius, YScale, Pwr)
{
	var vtNum = L.length;

	var diameter = 2*Radius;

	var vtNum = L.length;
	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];

		var Diameter = 2*Radius;
		var M0 = 
			lineSaw_GetM(i-1,L,Length,Diameter,Pwr);
		var M1 = 
			lineSaw_GetM(i,L,Length,Diameter,Pwr);

		var x0 = vt0.x;
		var y0 = vt0.y + M0 * Radius * YScale;
		var x1 = vt1.x;
		var y1 = vt1.y + M1 * Radius * YScale;

		line(x0,y0,x1,y1);
	}

}

function lineSaw_GetM(i, L, Length, Diameter, Pwr)
{
	var Dist = Length * i/L.length;
	var D = Dist/Diameter;
	var N = (D - floor(D));
	var M = pow(N,Pwr);
	return M;
}


function lineRect(L, Length, Radius, YScale, Portion)
{
	var vtNum = L.length;

	var diameter = 2*Radius;

	var vtNum = L.length;
	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];

		var Diameter = 2*Radius;
		var M0 = 
			lineRect_GetM(i-1,L,Length,Diameter,Portion);
		var M1 = 
			lineRect_GetM(i,L,Length,Diameter,Portion);

		var x0 = vt0.x;
		var y0 = vt0.y + M0 * Radius * YScale;
		var x1 = vt1.x;
		var y1 = vt1.y + M1 * Radius * YScale;

		line(x0,y0,x1,y1);
	}

}

function lineRect_GetM(i, L, Length, Diameter, Portion)
{
	var Dist = Length * i/L.length;
	var D = Dist/Diameter;
	var N = D - floor(D);
	if(N>Portion)
	{
		return -1;
	}
	else
	{
		return 1;
	}
}

function lineCloud(L, Length, ThetaSpd, ROnLen)
{
	var vtNum = L.length;
	var vtNum = L.length;
	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];

		var Offset0 = 
			lineCloud_GetOffset(i-1,L,Length,ThetaSpd,ROnLen);
		var Offset1 = 
			lineCloud_GetOffset(i,L,Length,ThetaSpd,ROnLen);

		var x0 = vt0.x + Offset0.x;
		var y0 = vt0.y + Offset0.y;
		var x1 = vt1.x + Offset1.x;
		var y1 = vt1.y + Offset1.y;

		line(x0,y0,x1,y1);
	}

}

function lineCloud_GetOffset(i, L, Length, ThetaSpd, ROnLen)
{
	var Dist = Length * i/L.length;
	var Theta = ThetaSpd * Dist;
	var R = ROnLen * Length;

	var x = R*cos(Theta);
	var y = R*sin(Theta);

	return createVector(x,y);
}


function lineNoiseOffset(L,Length,AmpOnL,FreqOnL,PhaseOnL)
{
	var vtNum = L.length;

	var A = AmpOnL * Length;

	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var bx0 = A * map(noise(t0*FreqOnL + PhaseOnL+10000),0,1,-1,1);
		var by0 = A * map(noise(t0*FreqOnL + PhaseOnL),0,1,-1,1);
		
		var t1 = i/vtNum;
		var bx1 = A * map(noise(t1*FreqOnL + PhaseOnL+10000),0,1,-1,1);
		var by1 = A * map(noise(t1*FreqOnL + PhaseOnL),0,1,-1,1);

		var x0 = vt0.x + bx0;
		var y0 = vt0.y + by0;
		var x1 = vt1.x + bx1;
		var y1 = vt1.y + by1;

		line(x0,y0,x1,y1);
	}
}


function lineRandomOffset(L,Length,AmpOnL)
{
	var vtNum = L.length;

	var A = AmpOnL * Length;

	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];
		var vt2 = L[i+1];

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var biasRadius0 = random(0,A);
		var biasTheta0 = random(0,TWO_PI);
		var bx0 = biasRadius0*cos(biasTheta0);
		var by0 = biasRadius0*sin(biasTheta0);
		
		var t1 = i/vtNum;
		var biasRadius1 = random(0,A);
		var biasTheta1 = random(0,TWO_PI);
		var bx1 = biasRadius1*cos(biasTheta1);
		var by1 = biasRadius1*sin(biasTheta1);

		var x0 = vt0.x + bx0;
		var y0 = vt0.y + by0;
		var x1 = vt1.x + bx1;
		var y1 = vt1.y + by1;

		line(x0,y0,x1,y1);
	}
}

function lineCloudXY(
	L, Length, ThetaSpdX, ThetaSpdY, ROnLen)
{
	var vtNum = L.length;
	var vtNum = L.length;
	for(var i=1;i<vtNum;i++)
	{
		var vt0 = L[i-1];
		var vt1 = L[i];

		var Offset0 = 
			lineCloud_GetOffsetXY(i-1,L,Length,ThetaSpdX,ThetaSpdY,ROnLen);
		var Offset1 = 
			lineCloud_GetOffsetXY(i,L,Length,ThetaSpdX,ThetaSpdY,ROnLen);

		var x0 = vt0.x + Offset0.x;
		var y0 = vt0.y + Offset0.y;
		var x1 = vt1.x + Offset1.x;
		var y1 = vt1.y + Offset1.y;

		line(x0,y0,x1,y1);
	}

}

function lineCloud_GetOffsetXY(
	i, L, Length, ThetaSpdX, ThetaSpdY, ROnLen)
{
	var Dist = Length * i/L.length;
	var ThetaX = ThetaSpdX * Dist;
	var ThetaY = ThetaSpdY * Dist
	var R = ROnLen * Length;

	var x = R*cos(ThetaX);
	var y = R*sin(ThetaY);

	return createVector(x,y);
}



function lineSinPSin(L,Length,A1,F1,P1,A2, F2,P2)
{
	var vtNum = L.length;

	var Amp1 = A1 * Length;
	var Amp2 = A2 * Length;

	for(var i=1;i<vtNum;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var s0 = Amp1 * sin(F1*t0*TWO_PI + P1);
		s0 += Amp2 * sin(F2*t0*TWO_PI + P2);

		var t1 = i/vtNum;
		var s1 = Amp1 * sin(F1*t1*TWO_PI + P1);
		s1 += Amp2 * sin(F2*t1*TWO_PI + P2);

		var x0 = vt0.x;
		var y0 = vt0.y + s0;
		var x1 = vt1.x;
		var y1 = vt1.y + s1;

		line(x0,y0,x1,y1);
	}
}

function lineSinNoise(L,Length,A,F1,P1,F2,P2)
{
	var vtNum = L.length;

	var Amp = A * Length;

	for(var i=1;i<vtNum;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var tangent02 = p5.Vector.sub(vt2,vt0);
		var normal = createVector(0,1);

		var t0 = (i-1)/vtNum;
		var s0 = Amp * sin(F1*t0*TWO_PI + P1);
		s0 *= 2*noise(F2*t0*TWO_PI + P2)-1;

		var t1 = i/vtNum;
		var s1 = Amp * sin(F1*t1*TWO_PI + P1);
		s1 *=  2*noise(F2*t1*TWO_PI + P2)-1;

		var x0 = vt0.x;
		var y0 = vt0.y + s0;
		var x1 = vt1.x;
		var y1 = vt1.y + s1;

		line(x0,y0,x1,y1);
	}
}







