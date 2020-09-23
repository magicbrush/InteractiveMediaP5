

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
	var tangentV = vtr.subtract(vtl);
	return tangentV.unit();
}

function getNormal(vtl,vtr)
{
	var forwardV = new Vector(0,0,1);
	var tangentV = getTangent(vtl,vtr);
	var normal = forwardV.cross(tangentV);
	return normal;
}

function getTangentAt(L,i)
{
	var V0 = L[i-1];
    var V1 = L[i];
    var V2 = L[i+1];
    var T = getTangent(V0,V2);
    return T;
}

function getNormalAt(L,i)
{
	var V0 = L[i-1];
    var V1 = L[i];
    var V2 = L[i+1];
    var T = getNormal(V0,V2);
    return T;
}
