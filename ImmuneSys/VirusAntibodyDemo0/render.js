// 实现场的显示
function renderField(F, FMin,FMax,crMin, crMax)
// F[i][j]是个标量，范围为[FMin,FMax]
// 将F[i][j]的值线性对应到颜色范围[crMin,crMax]
{
	// 画布的尺寸
	var w = width;
	var h = height;
	var FWidth = F.length;
	var FHeight = F[0].length;
	var rw = w/FWidth;
	var rh = h/FHeight;

	push();
	noStroke();
	for(var i=0;i<F.length;i++)
	{
		for(var j=0;j<F[i].length;j++)
		{
			// 获得F[i][j]的值
			var value = F[i][j];

			// 线性转换为要显示的颜色
			// t - [0,1]
			var t = 
				(value - FMin)/(FMax - FMin);
			let Cr = lerpColor(crMin, crMax, t);
			//求得要显示的图形（矩形）的位置
			// 从(i,j)转换为屏幕上的矩形范围（x,y,sizeW,sizeH)
			var x = i * rw;
			var y = j * rh;
			fill(Cr);
			rect(x,y,rw,rh);
		}
	}
	pop();
}

