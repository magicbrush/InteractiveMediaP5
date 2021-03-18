
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

// 阵列初始化
function CreateValueArray(rowNum, colNum)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var newCol = new Array();
		for(var r=0;r<rowNum;r++)
		{
			newCol[r] =random(-1,1);
		}
		C[c] = newCol;
	}
	return C;
}

// 初始化矢量阵列
function CreateVector2Array(rowNum, colNum)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var newCol = new Array();
		for(var r=0;r<rowNum;r++)
		{
			var ex = 0;
			var ey = 0;
			newCol[r] = createVector(ex,ey);
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


function InitValueArray_cosRadius(C,f,a)
{
	var hC = C.length/2;
	var hR = C[0].length/2;
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			var c1 = (i-hC);
			var r1 = (j-hR);	
			var radius = sqrt(c1*c1+r1*r1);
			var val = a*cos(f*radius);		
			C[i][j] = val;			
		}
	}
	return C;
}

function InitValueArray_KX(C,K)
{
	var hC = C.length/2;
	var hR = C[0].length/2;
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			var c1 = (i-hC);
			var r1 = (j-hR);			
			C[i][j] = K*c1;			
		}
	}
	return C;
}

function InitValueArray_KY(C,K)
{
	var hC = C.length/2;
	var hR = C[0].length/2;
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			var c1 = (i-hC);
			var r1 = (j-hR);			
			C[i][j] = K*r1;			
		}
	}
	return C;
}
function InitValueArray_aXbY(C,a,b)
{
	var hC = C.length/2;
	var hR = C[0].length/2;
	for(var i=0;i<C.length;i++)
	{
		for(var j=0;j<C[i].length;j++)
		{
			var c1 = (i-hC);
			var r1 = (j-hR);			
			C[i][j] = a*c1+b*r1 ;			
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