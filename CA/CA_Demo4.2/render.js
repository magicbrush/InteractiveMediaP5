// 2 将这个细胞阵列显示出来
function RenderFloatArray(A)
{
	var colNum = A.length;
	var rowNum = A[0].length;
	var xstep = width/colNum;
	var ystep = height/rowNum;
	var xstart = xstep/2;
	var ystart = ystep/2;

	for(var c = 0;c<A.length;c++)
	{
		for(var r = 0;r<A[c].length;r++)
		{
			var value = A[c][r];

			// 算出显示的位置x,y
			var x = c*xstep + xstart;
			var y = r*ystep + ystart;

			// 将value值映射为某种显示属性
			// 比如：大小，色彩,....
			var diameter = value*xstep;

			// 在x,y按照指定属性显示个东西
			ellipse(x,y,diameter,diameter);
		}
	}
}