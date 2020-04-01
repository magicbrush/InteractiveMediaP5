// 主程序
var B; // Magnetic Field
var BNext;
var DB; // delta B
var E; // Electro Field
var ENext; 
var DE; // delta E
var dt; 

function setup() {
	createCanvas(400,400);
	B = CreateCellArray(400,400);
	B = InitCells_Noise(-1,1,B,0.05);
	BNext = CopyCell(B);
	E = CreateVectorArray(400,400);
	//E = InitVector_Rand(1,E);
	E = InitVector_Noise( E, 0, 0.01)
	ENext = CopyCell(E);
	dt = 0.1;
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	drawB(B,20,0.5,0.25);
	//drawE(E,20,0.0,0.2);

	//Step(dt);
}


