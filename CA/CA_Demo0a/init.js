

function InitCells(colNum, rowNum)
{
	var C = new Array();
	for(var c=0;c<colNum;c++)
	{
		var Col = new Array();
		for(var r=0;r<rowNum;r++)
		{
			Col[r] = random(0,1);
		}
		C[c] = Col;
	}
	return C;
}

