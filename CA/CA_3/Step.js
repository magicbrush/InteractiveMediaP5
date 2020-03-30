// 细胞阵列的更新
function StepCA_SumMod2(C,CNext)
{
	for(var c=1;c<colNum-1;c++)
	{
		for(var r=1;r<rowNum-1;r++)
		{
			var sum =0;
			for(var dc=-1;dc<=1;dc++)
			{
				for(var dr=-1;dr<=1;dr++)
				{
					c2 = c+dc;
					r2 = r+dr;
					var v = C[c2][r2];
					sum += v;
				}
			}
			var updateVal = sum%2;
			CNext[c][r] = updateVal
		}
	}
	
}

function StepCA_SumFraction(C,CNext)
{
	for(var c=1;c<colNum-1;c++)
	{
		for(var r=1;r<rowNum-1;r++)
		{
			var sum =0;
			for(var dc=-1;dc<=1;dc++)
			{
				for(var dr=-1;dr<=1;dr++)
				{
					c2 = c+dc;
					r2 = r+dr;
					var v = C[c2][r2];
					sum += v;
				}
			}
			var updateVal = sum - floor(sum);
			CNext[c][r] = updateVal
		}
	}
	
}
