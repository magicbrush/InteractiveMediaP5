// 细胞阵列的初始化
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
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			C[c][r] = random(min,max);
		}
	}
	return C;
}

function InitCells_RandBool(probTrue,C)
{
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var rVal = random(0,1);
			if(rVal<probTrue)
			{
				C[c][r] = 1;
			}
			else
			{
				C[c][r] = 0;
			}
		}
	}
	return C;
}