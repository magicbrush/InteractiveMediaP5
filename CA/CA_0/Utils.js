// 辅助函数
function CopyCell(From)
{
	var To = new Array();
	for(var c=0;c<colNum;c++)
	{
		var Col = new Array();
		for(var r=0;r<rowNum;r++)
		{
			Col[r] = From[c][r];
		}
		To[c] = Col;
	}
	return To;
}
