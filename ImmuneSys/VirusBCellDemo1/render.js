function RenderField(
	F,
	minValue,maxValue,
	colorMin,colorMax)
// 对每个F[i][j], 将它的值
// 从[minValue,maxValue]
// 映射到色彩 colorMin~colorMax之间
// 显示为一个矩形块
{
	// w,h为场F的尺寸
	var w = F.length;
	var h = F[0].length;

	// 场到画布的尺寸转换比例
	var w2Scn = width / w;
	var h2Scn = height/h;

	push();
	noStroke();
	for(var i = 0;i<w;i++)
	{
		for(var j=0;j<h;j++)
		{
			var f = F[i][j];

			// 计算颜色
			var t01 = 
				map(f,minValue,maxValue,0,1);
			var cr = lerpColor(
				colorMin,colorMax, t01);

			// 计算矩形的位置和大小
			var x = i * w2Scn;
			var y = j * h2Scn;

			// 显示个矩形块
			fill(cr);
			rect(x,y,w2Scn,h2Scn);
		}
	}
	pop();
}