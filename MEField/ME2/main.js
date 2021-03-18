// 主程序
var B; // Magnetic Field
var BNext;
var DB; // delta B
var E; // Electro Field
var ENext; 
var DE; // delta E
var dt = 0.02;

var w = 400;
var h = 400;

function setup() {
	createCanvas(w,h);

	// Init B
	B = CreateCellArray(w,h);
	B = InitCells_SinRTheta(B,w,0.02,h,0.02);
	//B = InitCells_Noise(-1,1,B,0.05);
	//InitB_1();
	BNext = CopyCell(B);
	
	// Init E
	E = CreateVectorArray(w,h);
	//E = InitVector_Rand(1,E);
	E = InitVector_SinRTheta(E,0.1);
	//E = InitVector_Noise( E, 0, 0.01)
	ENext = CopyCell(E);
}


// 函数draw()：作画阶段
//var LastBDispT = 0.0;
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	var tNow = millis()/1000;
	/*var passedT = tNow - LastBDispT;
	if(passedT>1)
	{
		//drawB_Points(B);
		//drawE_Points(E);
		LastBDispT = tNow;
	}*/

	StepN(10,dt)

	drawB(B,25,0.5,0.2);
	drawE(E,25,0.0,2);	

	//mouseOperation(10*dt);
}

function mouseOperation(dt)
{
	if(mouseIsPressed)
	{
		var mpos = createVector(mouseX,mouseY);
		brushOperateAt(mpos,dt);
	}
}

