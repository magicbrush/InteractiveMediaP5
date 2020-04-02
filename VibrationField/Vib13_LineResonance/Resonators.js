
var ResonatorX = 30;
var RYMin = 10;
var RYMax = 190;
var RFreqMin = 0.1;
var RFreqMax = 10.0;
var RAmp = 0.3;

function ResonatorVib(tNow)
{
	for(var y = RYMin;y<RYMax;y++)
	{
		var f = map(y,RYMin,RYMax,RFreqMin,RFreqMax);
		var value = RAmp * sin(f*tNow);
		A0[ResonatorX][y] = value;
	}
}