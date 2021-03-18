function InitB_1()
{
	B[200][200] = 50;
	for(var p=0;p<50;p++)
	{
		B[200][250+p] = 5-0.1*p;
	}
}



// 阵列初始化
function CreateCellArray(rowNum, colNum)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var newCol = new Array();
		for(var r=0;r<rowNum;r++)
		{
			newCol[r] = 0;
		}
		C[c] = newCol;
	}
	return C;
}

function CreateVectorArray(rowNum, colNum)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var newCol = new Array();
		for(var r=0;r<rowNum;r++)
		{
			newCol[r] = createVector(0,0);
		}
		C[c] = newCol;
	}
	return C;
}

function InitVector_SinRTheta(C,lenFactor)
{
	var hc = c/C.length;
	var hr = r/C[0].length;
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			var c1 = 0.1*(c-hc);
			var r1 = 0.1*(r-hr);
			var angle = atan2(r1,c1);
			var L = sqrt(c1*c1+r1*r1);
			var VecLen = sin(L);
			var VecTheta = angle;
			var x = lenFactor* VecLen * cos(VecTheta);
			var y = lenFactor* VecLen * sin(VecTheta);
			var v = createVector(x,y);
			C[c][r] = v;
			//C[c][r] = createVector(-lenFactor);
		}
	}
	return C;
}

function InitVector_Rand(maxLen,C)
{
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			var L = random(0,maxLen);
			var angle = random(0,TWO_PI);
			var x = L * cos(angle);
			var y = L * sin(angle);
			var v = createVector(x,y);
			C[c][r] = v;
		}
	}
	return C;
}


function InitVector_Noise( C, maxLen, nscaleF)
{
	var leap = random(10000,100000);
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			var L0 = noise(c*nscaleF,r*nscaleF);
			var angle0 = noise(leap+c*nscaleF,leap+r*nscaleF);
			var L = map(L0,0,1,0,maxLen);
			var angle = map(angle0,0,1,0,TWO_PI);
			var x = L * cos(angle);
			var y = L * sin(angle);
			var v = createVector(x,y);
			C[c][r] = v;
		}
	}
	return C;
}

function InitCells_Rand(min,max,C)
{
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			C[c][r] = random(min,max);
		}
	}
	return C;
}

function InitCells_SinRTheta(C,rowNum,a,colNum,b)
{
	var halfC = C.length/2;
	var halfR = C[0].length/2;
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			var c1= a*(c-halfC);
			var r1 = b*(r-halfR);
			var radius = sqrt(c1*c1+r1*r1)
			var theta = atan2(r1,c1);

			C[c][r] = sin(radius)*sin(5*theta);
		}
	}
	return C;
}

function InitCells_Noise(min,max,C, scaleF)
{
	var randBias = random(0,10000);
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			C[c][r] = 
				map(noise(c*scaleF+randBias,r*scaleF+randBias),0,1,-1,1);
		}
	}
	return C;
}

