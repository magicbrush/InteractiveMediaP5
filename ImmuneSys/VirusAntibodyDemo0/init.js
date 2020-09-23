// 实现初始化
function createField(w,h,Min,Max)
{
	// 每个F[i] 是个数组
	var F = new Array();
	for(var i =0;i<w;i++)
	{
		F[i] = new Array();
		for(var j=0;j<h;j++)
		{
			F[i][j] = random(Min,Max);
		}
	}
	return F;
}

