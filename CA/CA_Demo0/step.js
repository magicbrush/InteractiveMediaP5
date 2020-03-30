// CA的演化运算
function CA_Step(C)
{
	var C_Next = Init();
	for(var c = 1;c<colNum-1;c++)
	{
		for(var r=1;r<rowNum-1;r++)
		{
			//获取到第(c,r)个细胞的值
			// 以某种方式计算更新该数值
			var value = C[c][r];

			// 从邻域取值，计算
			var sum = 0;
			for(var dc = -1;dc<=1;dc++)
			{
				for(var dr =-1;dr<=1;dr++)
				{
					var cid = c+dc;
					var rid = r+dr;
					var value2 = C[cid][rid];
					sum += value2;
				}
			}
			sum = sum - floor(sum);

			C_Next[c][r] = sum;
		}
	}
	return C_Next;
}

function CA_Step2(C)
{
	var C_Next = Init();
	for(var c = 1;c<colNum-1;c++)
	{
		for(var r=1;r<rowNum-1;r++)
		{
			//获取到第(c,r)个细胞的值
			// 以某种方式计算更新该数值
			var value = C[c][r];

			// 从邻域取值，计算
			var sum = 0;
			for(var dc = -1;dc<=1;dc++)
			{
				for(var dr =-1;dr<=1;dr++)
				{
					var cid = c+dc;
					var rid = r+dr;
					var value2 = C[cid][rid];
					sum += value2;
				}
			}
			sum = sum/9;

			C_Next[c][r] = sum;
		}
	}
	return C_Next;
}
