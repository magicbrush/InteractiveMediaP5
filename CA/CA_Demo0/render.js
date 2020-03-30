function RenderCells(C)
{
	var stepX = width/colNum;
	var stepY = height/rowNum;
	var XOrigin = stepX/2;
	var YOrigin = stepY/2;
	for(var c = 0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			//获取到第(c,r)个细胞的值
			// 以某种方式渲染出来
			var value =C[c][r];

			var x = c*stepX + XOrigin;
			var y = r*stepY + YOrigin;

			var d = stepX*value;
			ellipse(x,y,d,d);
		}
	}
}

function RenderCells2(C)
{
	var tNow = millis()/1000;
	var stepX = width/colNum;
	var stepY = height/rowNum;
	var XOrigin = stepX/2;
	var YOrigin = stepY/2;
	for(var c = 0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			//获取到第(c,r)个细胞的值
			// 以某种方式渲染出来
			var value = C[c][r];

			var x = c*stepX + XOrigin;
			var y = r*stepY + YOrigin;

			var freq = 5*value;
			var d = stepX *
			 (0.5*sin(tNow * freq)+0.5);

			ellipse(x,y,d,d);
		}
	}
}
