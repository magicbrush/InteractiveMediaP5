// CA阵列的初始化
function Init()
{
	// 将Cells初始化为一个数值方阵
	C = new Array();
	for(var c = 0;c<colNum;c++)
	{
		Col = new Array();
		for(var r=0;r<rowNum;r++)
		{
			Col[r] = random(0,1);
		}
		C[c] = Col;
	}
	return C;
}
