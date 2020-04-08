// 辅助函数
function CopyCell(FromC)
{
	var To = new Array();
	for(var c=0;c<FromC.length;c++)
	{
		var Col = new Array();
		for(var r=0;r<FromC[c].length;r++)
		{
			Col[r] = FromC[c][r];
		}
		To[c] = Col;
	}
	return To;
}

function LerpFloatCells(From,To,t)
{
	var FT = CopyCell(From);
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var F = From[c][r];
			var T = To[c][r];
			FT[c][r] = lerp(F,T,t);
		}
	}
	return FT;
}

// coordinate conversion
function XY2CR(XY)
{
	var sclX = w/cols;
	var sclY = h/rows;
	var c = XY.x/sclX;
	var r = XY.y/sclY;
	var cr = createVector(c,r);
	return cr;
}

function CR2XY(CR)
{
	var sclX = w/cols;
	var sclY = h/rows;
	var x = CR.x * sclX;
	var y = CR.y * sclY;
	var xy = createVector(x,y);
	return xy;
}