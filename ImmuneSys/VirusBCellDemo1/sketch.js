// 场量
var Virus; // 病毒
var Antibody; // 抗体

// 场量的参数
var VirusMax = 10.0; // 病毒载量极值
var AntiMax = 10.0; // 抗体载量极值

// 尺寸参数
var canvasW = 320;
var canvasH = 320;
var fieldW = 80;
var fieldH = 80;

// 动态参数
var dt = 0.1;
var virusDiffuse = 0.1; // 病毒扩散率
var virusIncRate = 0.13; // 病毒增殖速率
var antiDiffuse = 0.5;// 抗体扩散率
var antiEffect = 0.01; // 抗体杀毒效率
var antiExhaust = 0.018; // 抗体消耗率
var antiIncRate = 0.03; // 抗体增长率

// B细胞
var BCellPos;
var BCellAmt = 10;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(canvasW,canvasH);

	// 创建Virus和Antibody
	Virus = 
		InitField(
			fieldW,fieldH,0,VirusMax);
	Antibody = 
		InitField(
			fieldW,fieldH,0,AntiMax);

	BCellPos = new Array();
	for(i=0;i<BCellAmt;i++)
	{
		BCellPos[i] = 
			createVector(random(0,width),random(0,height));
	}
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	var crVirusMin = color(255,255,255,100);
	var crVirusMax = color(255,0,0,100);
	RenderField(
		Virus,
		0,VirusMax,
		crVirusMin,crVirusMax);

	var crAntiMin = color(255,255,255,100);
	var crAntiMax = color(0,255,255,100);
	RenderField(
		Antibody,
		0,AntiMax,
		crAntiMin,crAntiMax);

	step(dt);

	push();
	for(var i=0;i<BCellPos.length;i++)
	{
		var pos = BCellPos[i];
		fill(255);
		stroke(0);
		ellipse(pos.x,pos.y,10,10);
	}
	pop();

	//ellipse(100,100,200,200); // 画圆形
}