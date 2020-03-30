function step(C) {

	var C2 = InitCells(colNum,rowNum);
	for(var c=1;c<colNum-1;c++)
	{
		for(var r=1;r<rowNum-1;r++)
		{
			var value = C[c][r];

			// 遍历(c,r)周围9个，进行计算
			var sum = 0;
			for(var dc =-1;dc<=1;dc++)
			{
				for(var dr = -1;dr<=1;dr++)
				{
					var cid = c + dc;
					var rid = r+dr;
					sum += C[cid][rid];
				}
			}
			C2[c][r] = sum - floor(sum)
		}
	}
	return C2;
}