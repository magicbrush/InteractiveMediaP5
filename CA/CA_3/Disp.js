// 细胞阵列的渲染
function drawCellArray1(C)
{
	var xStep = width/colNum;
	var yStep = height/rowNum;
	var xBias = xStep/2;
	var yBias = yStep/2;
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var cell = C[c][r];
			x = c*xStep + xBias;
			y = r*yStep + yBias;
			var diameter = cell*xStep;
			fill(255);
			ellipse(x,y,diameter,diameter);
		}
	}
}

function drawCellArray2(C)
{
	var tNow = millis()/1000;
	var xStep = width/colNum;
	var yStep = height/rowNum;
	var xBias = xStep/2;
	var yBias = yStep/2;
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var cell = C[c][r];
			x = c*xStep + xBias;
			y = r*yStep + yBias;
			var freq = cell;
			var diameter = 
				xStep * (0.5*sin(freq*tNow)+0.5);
			fill(255);
			ellipse(x,y,diameter,diameter);
		}
	}

}


function drawCellArray3(C)
{
	var tNow = millis()/1000;
	var xStep = width/colNum;
	var yStep = height/rowNum;
	var xBias = xStep/2;
	var yBias = yStep/2;
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var cell = C[c][r];
			x = c*xStep + xBias;
			y = r*yStep + yBias;
			var freq = cell;
			var diameter = 
				xStep * (0.5*sin(2*tNow+cell*1.67)+0.5);
			fill(255);
			ellipse(x,y,diameter,diameter);
		}
	}

}
