
function Step(dt)
{
	A1 = StepA1(dt,A0,A1,K); // 更新一阶导数
	A0 = StepA0(dt,A0,A1,R); // 更新A0
}

function StepA1(dt,A0,A1,K)
{
	var A1Copy = CopyCell(A1);
	for(var c=1;c<A0.length-1;c++)
	{
		for(var r=1;r<A0[c].length-1;r++)
		{
			// 拉普拉斯算子：加权和
			var al = A0[c-1][r];
			var ar = A0[c+1][r];
			var au = A0[c][r-1];
			var ab = A0[c][r+1];
			var a = A0[c][r];
			var delta = 0.25*(al+ar+au+ab)-a;
			
			// 改变原来的值
			A1Copy[c][r] += K*A0[c][r]*delta*dt;
		}
	}
	return A1Copy;
}

function StepA0(dt,A0,A1,R)
{
	A0Copy = CopyCell(A0);
	for(var c=1;c<A0.length-1;c++)
	{
		for(var r=1;r<A0[c].length-1;r++)
		{
			var a1 = A1[c][r];
			A0Copy[c][r] += R*a1*dt;
		}
	}
	return A0Copy;
}

