
// 3 实现演化规则
function Step1(A)
{
	// 先复制一个A: ACopy
	var ACopy = CopyArray(A);
	for(var c = 1;c<A.length-1;c++)
	{
		for(var r = 1;r<A[c].length-1;r++)
		{
			// cnb：c-1,c,c+1
			// rnb: r-1,r,r+1
			var sum = 0;
			for(var dc = -1;dc<=1;dc++)
			{
				for(var dr=-1;dr<=1;dr++)
				{
					var cnb = c+dc;
					var rnb = r+dr;
					var NBValue = A[cnb][rnb];
					sum += NBValue;
				}
			}
			var value = sum - floor(sum);
			ACopy[c][r] = value;
			// 假设 c=10,r=11
			// A[10][11]的数值更新了
			// 下一轮循环到这里 c=10,r=12
		}
	}
	return ACopy;

}

function Step2(A)
{
	// 先复制一个A: ACopy
	var ACopy = CopyArray(A);
	for(var c = 1;c<A.length-1;c++)
	{
		for(var r = 1;r<A[c].length-1;r++)
		{
			// cnb：c-1,c,c+1
			// rnb: r-1,r,r+1
			var sum = 0;
			for(var dc = -1;dc<=1;dc++)
			{
				for(var dr=-1;dr<=1;dr++)
				{
					var cnb = c+dc;
					var rnb = r+dr;
					var NBValue = A[cnb][rnb];
					sum += NBValue;
				}
			}
			var value = sum*sum-floor(sum*sum);
			ACopy[c][r] = value;
			// 假设 c=10,r=11
			// A[10][11]的数值更新了
			// 下一轮循环到这里 c=10,r=12
		}
	}
	return ACopy;
}

function CopyArray(A)
{
	var ACopy = new Array();
	for(var i=0;i<A.length;i++)
	{
		ACopy[i] = new Array();
		for(var j=0;j<A[i].length;j++){
			ACopy[i][j] = A[i][j];
		}
	}
	return ACopy;
}