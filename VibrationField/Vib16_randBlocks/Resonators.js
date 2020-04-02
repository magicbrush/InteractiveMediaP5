
var ResonatorPos;
var ResonatorFreqs;
var RFreqBase = 0.33;
var RFreqPwr = 2.0;
var RAmp = 0.3;

function InitResonators()
{
	ResonatorPos = new Array();
	ResonatorFreqs = new Array();
	var id = 0;
	var f = RFreqBase;
	for(var x = 30;x<180;x+=40)
	{
		for(var y= 30;y<180;y+=40)
		{
			var pos = createVector(x,y);
			ResonatorPos[id] = pos;
			ResonatorFreqs[id] = f;
			f*= RFreqPwr;
			id++;
		}
	}
}

function ResonatorVib(tNow)
{
	for(var i=0;i<ResonatorPos.length;i++)
	{
		var p = ResonatorPos[i];
		var f = ResonatorFreqs[i];
		var mh = mouseY/height;
		var freq = f*mh;
		var value = RAmp * sin(tNow * freq);
		A0[p.x][p.y] = value;
	}
}