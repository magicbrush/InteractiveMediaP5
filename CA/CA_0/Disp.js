// 细胞阵列的渲染
function drawCellArray()
{
	var xStep = width/colNum;
	var yStep = height/rowNum;
	var xBias = xStep/2;
	var yBias = yStep/2;
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var cell = Cells[c][r];
			x = c*xStep + xBias;
			y = r*yStep + yBias;
			var diameter = cell*xStep;
			fill(255);
			ellipse(x,y,diameter,diameter);
		}
	}

}
