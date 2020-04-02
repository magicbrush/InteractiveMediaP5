
function InitK_0()
{
	for(var r = 0;r<200;r++)
	{
		K[80][r] = 0;
	}
	K[80][90]=5;
	K[80][110]=5;
}

function InitF_1(kVal,F)
{
	var F2 =CopyCell(F);
	for(var c =80;c<200;c++)
	{
		for(var r = 0;r<200;r++)
		{
			F2[c][r] = kVal;
		}
	}
	return F2;
}

function InitF_2(cL,cR,lVal,rVal,F)
{
	var F2 =CopyCell(F);
	for(var c =cL;c<cR;c++)
	{
		for(var r = 0;r<200;r++)
		{
			var c01 = (c-cL)/(cR-cL);
			var v = map(c01,0,1,lVal,rVal);
			F2[c][r] = v;
		}
	}
	return F2;
}

function InitF_3(
	xCtr,yCtr,
	radiusMin,radiusMax,
	valMin,valMax,F)
{
	var F2 =CopyCell(F);
	for(var c =0;c<200;c++)
	{
		for(var r = 0;r<200;r++)
		{
			var xbias = c-xCtr;
			var ybias = r-yCtr;
			var rd = 
				sqrt(xbias*xbias + ybias*ybias);
			if(rd<radiusMin||rd>radiusMax)
			{
				continue;
			}
			var val = 
				map(rd,radiusMin,radiusMax,valMin,valMax);
			F2[c][r] = val;
		}
	}
	return F2;
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

function ApplyCells_Value(C,val)
{
		for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			C[c][r] = val;
		}
	}
	return C;
}

