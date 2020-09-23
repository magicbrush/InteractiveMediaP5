// 场的基本参数
var fieldW = 80;
var fieldH = 80;
var canvasW = 320;
var canvasH = 320;

// 场量
var Virus; // 病毒
var Antibody; // 抗体

// 场的参数
var virusMax = 10;
var antiMax = 10;

// 动态参数
var dt = 0.1;
var virusDiffuse = 0.01;
var antiDiffuse = 0.3;


// 函数setup() ：准备阶段
function setup() {
	createCanvas(canvasW,canvasH);

	// 1 创建场-病毒和抗体
	Virus = createField(
		fieldW,fieldH,0,virusMax);
	Antibody = createField(
		fieldW,fieldH,0,antiMax);
	
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	// 2 显示场
	let VMinCr = color(255,255,255,100);
	let VMaxCr = color(255,0,0,100);
	renderField(Virus, 0,virusMax,VMinCr, VMaxCr);
	
	let AMinCr = color(255,255,255,100);
	let AMaxCr = color(0,255,255,100);
	renderField(Antibody, 0, antiMax, AMinCr,AMaxCr);
	

	// 让场步进-更新
	step(dt);

	//ellipse(100,100,200,200); // 画圆形
}



