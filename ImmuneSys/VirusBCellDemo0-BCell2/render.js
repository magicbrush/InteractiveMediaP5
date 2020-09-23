function RenderField(
	F, 
	minF,maxF, 
	colorMin, colorMax)
// F[i][j] - 标量 f~[minF,maxF]
// 显示方式：
// 将 f ~【minF,maxF】->[色彩0， 色彩1]
{
	var FWidth = F.length;
	var FHeight = F[0].length;

	var canvasW2FWidth = width/FWidth;
	var canvasH2FHeight = height/FHeight;

	push();
	noStroke();
	for(var i=0;i<FWidth;i++)
	{
		for(var j=0;j<FHeight;j++)
		{
			// 计算显示颜色
			var f = 
				F[i][j];
			var t01 = 
				map(f,minF,maxF,0,1);
			var DispCr = 
				lerpColor(colorMin,colorMax,t01);

			// 计算显示位置
			x = i * canvasW2FWidth;
			y = j * canvasH2FHeight;

			// 显示一个矩形
			fill(DispCr);
			rect(x,y,canvasW2FWidth,canvasH2FHeight);
		}
	}
	pop();
}