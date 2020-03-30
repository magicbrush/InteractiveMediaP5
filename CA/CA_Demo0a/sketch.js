var Cells;
var colNum = 20;
var rowNum = 20;


// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);

	// 创建一个阵列，大小 colNum * rowNum
	// 每个格子内的数值为 0~1的随机数
	Cells = new Array();
	for(var c=0;c<colNum;c++)
	{
		var Col = new Array();
		for(var r=0;r<rowNum;r++)
		{
			Col[r] = random(0,1);
		}
		Cells[c] = Col;
	}

}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	RenderCells(Cells);
}


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

