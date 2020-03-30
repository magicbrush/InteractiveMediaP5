// 主程序
var Cells; // 细胞阵列
var Cells_Next; // 细胞阵列
var colNum = 20; // 列数
var rowNum = 20; // 行数
var stepPeriod = 1.0; // 更新周期

function setup() {
	createCanvas(400,400);
	Cells = CreateCellArray(colNum,rowNum);
	Cells_Next = CreateCellArray(colNum,rowNum);
	//Cells = InitCells_Rand(0,1,Cells);
	Cells = InitCells_RandBool(0.1,Cells);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);
	drawCellArray();
	UpdateCellsByPeriod(stepPeriod);
}

// 更新CA
var lastT = 0;
function UpdateCellsByPeriod(period)
{
	var tNow = millis()/1000;
	if(tNow - lastT>period)
	{
		StepCA_SumMod2(Cells,Cells_Next);
		Cells = CopyCell(Cells_Next);
		lastT = tNow;
	}
}


