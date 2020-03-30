var Cells;
var colNum = 20;
var rowNum = 20;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);

	// 创建一个阵列，大小 colNum * rowNum
	// 每个格子内的数值为 0~1的随机数
	Cells = InitCells(colNum,rowNum);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	RenderCells(Cells);
	Cells = step(Cells);
}



