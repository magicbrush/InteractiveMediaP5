
function RenderCells(C)
{
	var xStep = width/colNum;
	var yStep = height/rowNum;
	var xOrigin = xStep/2;
	var yOrigin = yStep/2;

	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var value = C[c][r];
			var x = xStep*c + xOrigin;
			var y = yStep*r + yOrigin;

			var diameter = value * xStep;
			ellipse(x,y,diameter,diameter);
		}
	}
}