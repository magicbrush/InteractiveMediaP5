// 场
var Virus; // 病毒
var Antibody; // 抗体

// 场量的设置
var virusMax = 10;// 病毒最大载量
var antiMax = 10;// 抗体最大载量

// 尺寸参数
var canvasWd = 200;// 画布的尺寸
var canvasHt = 200;
var fieldWd = 80; // 场的尺寸
var fieldHt = 80; 

// 动态参数
var dt = 0.1; //时间步长
var virusDiffuse = 0.01; // 病毒扩散系数
var antiDiffuse = 0.015; // 抗体扩散系数
var antiKillEffect = 0.05; // 抗体清除病毒的效率
var antiUse = 0.01; // 抗体消耗率


// 函数setup() ：准备阶段
function setup() {
	createCanvas(canvasWd,canvasHt);
	Virus = InitField(fieldWd,fieldHt,0,10);
	Antibody = InitField(fieldWd,fieldHt,0,5);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	let crVirusMin = color(255,255,255,100);
	let crVirusMax = color(255,0,0,100);
	RenderField(
		Virus,0,virusMax,
		crVirusMin,crVirusMax);

	let crAntiMin = color(255,255,255,100);
	let crAntiMax = color(0,255,255,100);
	RenderField(Antibody,0,antiMax,
		crAntiMin,crAntiMax,100);

	step(dt);
}