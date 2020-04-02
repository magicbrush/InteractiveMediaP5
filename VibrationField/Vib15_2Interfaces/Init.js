
function ClearA0A1()
{
	A0 = ApplyCells_Value(A0,0);
    A1 = ApplyCells_Value(A1,0);
}

function InitK_0()
{
	for(var r = 0;r<h;r++)
	{
		K[80][r] = 0;
	}
	K[80][90]=5;
	K[80][110]=5;
}

function ApplyValueInRect(Value,F,xmin,xmax,ymin,ymax)
{
	var F2 =CopyCell(F);
	for(x=xmin;x<xmax;x++)
	{
		for(y=ymin;y<ymax;y++)
		{
			F2[x][y] = Value;
		}
	}
	return F2;
}

function InitF_1(kVal,F)
{
	var F2 =CopyCell(F);
	for(var c =80;c<w;c++)
	{
		for(var r = 0;r<h;r++)
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
		for(var r = 0;r<h;r++)
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
	for(var c =0;c<w;c++)
	{
		for(var r = 0;r<h;r++)
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

function ApplyValueToBound(F, boundSize, value)
{
	var F2 =CopyCell(F);
	for(var c =0;c<w;c++)
	{
		for(var r = 0;r<h;r++)
		{
			if(
				c<=boundSize||w-c<=boundSize || 
				r<=boundSize||h-r<=boundSize)
			{
				F2[c][r] = value;
			}
		}
	}
	return F2;
}

function InitF_Egg(
	F0,F1,
	m,n,
	DMin,DMax,
	valMin,valMax,F)
{
	//print("F0:" + F0 + " F1:" + F1);
	var F2 =CopyCell(F);
	for(var c =0;c<w;c++)
	{
		for(var r = 0;r<h;r++)
		{
			var p = createVector(c,r);
			
			let PF0 = F0.copy();
			PF0 = PF0.mult(-1);
			PF0 = PF0.add(p);
			let PF1 = F1.copy();
			PF1 = PF1.mult(-1);
			PF1 = PF1.add(p);
			var B1 = PF0.mag();
			var B2 = PF1.mag();
			var D = B1*m + B2*n;
			/*
			if(c==10&&r==50)
			{
				print("D1:" + D1 + " D2:" + D2 + 
					" B1:" + B1 + " B2:" + B2 + 
					" F0:" + F0 + " F1:" + F1 + 
					" PF0:" + PF0 + " PF1:" + PF1);
			}*/

			if(D>DMax||D<DMin)
			{
				continue;
			}
			
			var val = 
				map(D,DMin,DMax,valMin,valMax);
			F2[c][r] = val;
		}
	}
	return F2;
}


function InitF_Noise(
	F,scaleX,scaleY,xBias,yBias,NMin, NMax)
{
	var F2 =CopyCell(F);
	for(var c =0;c<w;c++)
	{
		for(var r = 0;r<h;r++)
		{
			var val = noise(
				xBias + c*scaleX, yBias + r*scaleY);
			val = map(val,0,1,NMin,NMax);
			F2[c][r] = val;
		}
	}
	return F2;
}


function InitGrating(x,w,interval,ratio,F,opaqueValue)
{
	var F2 =CopyCell(F);
	for(var r=0;r<h;r++)
	{
		var y01 = r/interval - floor(r/interval);
		if(y01<ratio)
		{
			for(var c=x;c<x+w;c++)
			{
				F2[c][r] = opaqueValue;
			}
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

