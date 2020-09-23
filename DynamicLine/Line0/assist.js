
function createBaseLine()
{
	var Edge = width/10;
	var startX = Edge;
	var endX = width - Edge;
	var Y = height/2;
	var vtNum = 512;
	var Len = width - 2*Edge;
	var step = Len/vtNum;

	var Line = new Array();
	for(var i=0;i<512;i++)
	{
		var x = startX + i * step;
		var y = Y;
		Line[i] = createVector(x,y);
	}
	return Line;
}

function ComputeLineLength(L)
{
	var dist = 0;
	for(var i=1;i<L.length;i++)
	{
		var v0 = L[i-1];
		var v1 = L[i];
		var xdiff = v1.x-v0.x;
		var ydiff = v1.y-v0.y;
		step = sqrt(xdiff*xdiff + ydiff*ydiff);
		dist += step;
	}
	return dist;
}

function getTime()
{
	return millis()/1000;
}

// ---------- Vector -----------------------//
function getTangent(vtl,vtr)
{
	var tangentV = p5.Vector.sub(vtr,vtl);
	return tangentV.heading();
}

function getNormal(vtl,vtr)
{
	var tangentV = getTangent(vtl,vtr);
	var normal = rotate(tangentV,HALF_PI);
	return normal;
}

