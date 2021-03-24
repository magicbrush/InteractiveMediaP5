
// 辅助函数
function CopyArray(From)
{
	var To = new Array();
	for(var c=0;c<From.length;c++)
	{
		var Col = new Array();
		for(var r=0;r<From[c].length;r++)
		{
			Col[r] = From[c][r];
		}
		To[c] = Col;
	}
	return To;
}


function AddValueArray(P,Q,p,q)
{
	var SumAry = new Array();
	for(var i=0;i<P.length;i++)
	{
		SumAry[i] = new Array();
		for(var j=0;j<P[0].length;j++)
		{
			var sumValue = P[i][j] * p + Q[i][j] * q;
			SumAry[i][j] = sumValue;
		}
	}
	return SumAry;
}

function AddVectorArray(P,Q,p,q)
{
	var SumAry = new Array();
	for(var i=0;i<P.length;i++)
	{
		SumAry[i] = new Array();
		for(var j=0;j<P[0].length;j++)
		{
			pvec = P[i][j];
			qvec = Q[i][j];
			pvec.mult(p);
			qvec.mult(q);
			var sumVec = p5.Vector.add(pvec,qvec);
			SumAry[i][j] = sumVec;
		}
	}
	return SumAry;
}

// 阵列初始化
function CreateValueArray(rowNum, colNum, value)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var newCol = new Array();
		for(var r=0;r<rowNum;r++)
		{
			newCol[r] = value;
		}
		C[c] = newCol;
	}
	return C;
}

// 初始化矢量阵列
function CreateVector2Array(rowNum, colNum, vec)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var newCol = new Array();
		for(var r=0;r<rowNum;r++)
		{			
			newCol[r] = vec;
		}
		C[c] = newCol;
	}
	return C;
}

function InitValueArray_Rand(C,minValue,maxValue)
{
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			C[i][j] = random(minValue,maxValue);
		}
	}
}

function InitValueArray_SinThetaSinRadius(
	C,rFactor,thetaFactor,rFreq,thetaFreq)
{
	var hC = C.length/2;
	var hR = C[0].length/2;
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			var c1 = rFactor*(i-hC);
			var r1 = thetaFactor*(j-hR);
			var radius = sqrt(c1*c1+r1*r1);
			var theta = atan2(r1,c1);
			//C[i][j] = sin(rFreq*radius)*sin(thetaFreq*theta);
			C[i][j] = sin(rFreq*radius)*sin(thetaFreq*theta);;
			//C[i][j] = random(-1,1);
		}
	}
	return C;
}

function InitVec2Array_RTheta(
	C,rFactor,thetaFactor,rFreq,thetaFreq)
{
	var hC = C.length/2;
	var hR = C[0].length/2;
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			var c1 = rFactor*(i-hC);
			var r1 = thetaFactor*(j-hR);
			var radius = sqrt(c1*c1+r1*r1);
			var theta = atan2(r1,c1);
			var VLen = sin(rFreq*radius)*sin(thetaFreq*theta);
			var VAngle = theta;
			var VX = VLen * cos(VAngle);
			var VY = VLen * sin(VAngle);
			//C[i][j] = sin(rFreq*radius)*sin(thetaFreq*theta);
			C[i][j] = createVector(VX,VY);
			//C[i][j] = random(-1,1);
		}
	}
	return C;
}