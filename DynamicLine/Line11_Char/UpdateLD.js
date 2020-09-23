
function InitDAFPLC(L,channelNum)
{
	var n = L.length;
	DAmp = new Array();
	DFreq = new Array();
	DPhase = new Array();
	for(var c=0;c<channelNum;c++)
	{
		DAmp[c] = new Array();
		DFreq[c] = new Array();
		DPhase[c] = new Array();
		for(var i=0;i<n;i++)
		{
			var t = i/n;
			DAmp[0][i] = 0;
			DFreq[0][i] = 0;
			DPhase[0][i] = 0;
		}
		print(c);
	}
}

// --------------------- UpdateLD ----------------//
function DynamicLD_VertBias(L,Length,Amp,Freq,Phase,timeNow, ampOnLen)
{
	var vtNum = L.length;

	var L2 = new Array();
	L2[0] = L[0];
	var a = Length * ampOnLen;
	for(var i=1;i<vtNum-1;i++)
	{
		vt0 = L[i-1];
		vt1 = L[i];
		vt2 = L[i+1];

		var T = getTangent(vt0,vt2);
		var N = getNormal(vt0,vt2);

		var bias = 0;
		for(var c = 0;c<Amp.length;c++)
		{
			var amp = Amp[c][i] * Length;
			var freq = Freq[c][i];
			var phase = Phase[c][i];
			bias += a * amp * sin(freq * timeNow + phase);
		}

		var Offset = N.multiply(bias);
		var Pos = L[i].add(Offset);

		L2[i] = Pos;
	}
	L2[L.length-1] = L[L.length-1];
	return L2;
}


// ------------------- GenDAFP -------------------------//
function GenDAFP_0(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1;
		DFreq[chl][i] = 5;
		DPhase[chl][i] = t * 1 * TWO_PI;
	}
}

function GenDAFP_1(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1*sin(TWO_PI*5*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = 0;
	}
}

function GenDAFP_2(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.05*sin(TWO_PI*5*t);
		DFreq[chl][i] = 5+3*sin(5*TWO_PI*t);
		DPhase[chl][i] = 0;
	}
}

function GenDAFP_VaryA_Sin5(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.05*sin(TWO_PI*5*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = 0;
	}
}

function GenDAFP_VaryA_AbsSin5(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = abs(0.05*sin(TWO_PI*5*t));
		DFreq[chl][i] = 5;
		DPhase[chl][i] = 0;
	}
}

function GenDAFP_VaryA_Noise5(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1*noise(5*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = 0;
	}
}

function GenDAFP_VaryA_Noise50(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1*noise(50*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = 0;
	}
}

function GenDAFP_VaryA_Noise50_PhaseSin10(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1*noise(50*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = sin(10*t);
	}
}

function GenDAFP_ANoise50_PhaseNoise10(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1*noise(50*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = TWO_PI * noise(10*t);
	}
}

function GenDAFP_AStatic_PhaseNoise10(chl)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		DAmp[chl][i] = 0.1*noise(50*t);
		DFreq[chl][i] = 5;
		DPhase[chl][i] = TWO_PI * noise(10*t);
	}
}


// -----------  GenDynamicProp ------------------------------//
// ---------- 生成单通道的参数分布 
function GenDynamicProp_Linear(
	PropChl,A,B,ampScale,distScale)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		PropChl[i] = ampScale * lerp(A,B,t);
	}
	return PropChl;
}

function GenDynamicProp_PowSin(
	PropChl,ampScale,distScale,powerFactor)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		var s = sin(distScale*t);
		if(s>0)
		{
			s = pow(s,powerFactor);
		}
		else
		{
			s = -pow(-s,powerFactor);
		}
		PropChl[i] = ampScale*s;
	}
	return PropChl;
}

function GenDynamicProp_PowComplementSin(
	PropChl,ampScale,distScale,powerFactor)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		var s = sin(distScale*t);
		if(s>0)
		{
			s = 1-pow(s,powerFactor);
		}
		else
		{
			s = pow(-s,powerFactor)-1;
		}
		PropChl[i] = ampScale*s;
	}
	return PropChl;
}

function GenDynamicProp_PowComplementAbsSin(
	PropChl,ampScale,distScale,powerFactor)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		var s = abs(sin(distScale*t));
		s = 1-pow(s,powerFactor);
		PropChl[i] = ampScale*s;
	}
	return PropChl;
}

function GenDynamicProp_AbsPowSin(
	PropChl,ampScale,distScale,powerFactor)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		var s = sin(distScale*t);
		if(s>0)
		{
			s = pow(s,powerFactor);
		}
		else
		{
			s = -pow(-s,powerFactor);
		}
		PropChl[i] = abs(ampScale*s);
	}
	return PropChl;
}

function GenDynamicProp_Noise(
	PropChl,ampScale,distScale)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		PropChl[i] = ampScale * noise(distScale*t);
	}
	return PropChl;
}

function GenDynamicProp_Saw(
	PropChl,ampScale,sawInterval,powerFactor)
{
	var n = L.length;
	for(var i=0;i<n;i++)
	{
		var t = i/n;
		var s = ampScale * pow(fract(t/sawInterval),powerFactor);
		PropChl[i] = s;
	}
	return PropChl;
}

