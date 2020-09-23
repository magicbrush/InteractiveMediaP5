
function createBaseLine_Hor(vtNum)
{
	var Edge = width/10;
	var startX = Edge;
	var endX = width - Edge;
	var Y = height/2;
	var Len = width - 2*Edge;
	var step = Len/vtNum;

	var Line = new Array();
	for(var i=0;i<512;i++)
	{
		var x = startX + i * step;
		var y = Y;
		Line[i] = new Vector(x,y,0);
	}
	return Line;
}

function createBaseLine_Ring(
	vtNum, ctrX, ctrY, radius, thetaBias)
{
	var ThetaStep = TWO_PI/vtNum;
	var Line = new Array();
	for(var i=0;i<vtNum;i++)
	{
		var Theta = i*ThetaStep + thetaBias;
		var bx = cos(Theta);
		var by = sin(Theta);
		Line[i] = new Vector( 
			radius*bx+ctrX, radius*by+ctrY,0 );
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

function createLineSeg(posA,posB,res)
{
	var offset = posA.subtract(posB);
	var d = offset.length();
	var segNum = ceil(d/res);
	var tStep = 1/segNum;
	var Line = new Array();
	for(var i=0;i<segNum;i++)
	{
		var t = i/segNum;
		var p = Vector.lerp(posA,posB, t);
		Line[i] = p;
	}
	return Line;
}


