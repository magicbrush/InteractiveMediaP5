var B;
var E;
var w = 400;
var h = 400;

var P;
var PNum = 300;
var dt = 1;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(w,h);

	// Init B and E
	B = CreateValueArray(w,h);
	B = InitValueArray_SinThetaSinRadius(B,0.1,0.1,0.15,3);
	E = CreateVector2Array(w,h);
	E = InitVec2Array_RTheta(E,0.1,0.1,0.15,3);

	P = new Array();
	for(var i=0;i<PNum;i++)
	{
		var px = random(0,w);
		var py = random(0,h);
		P[i] = createVector(px,py);
	}

}

// 函数draw()：作画阶段
function draw() {
	fill(255,80);// 填充白色
	rect(-1,-1,width+2,height+2);
	//ellipse(100,100,200,200); // 画圆形


	P = MoveParticleByE(P,E,dt);

	drawValueArray(B,20,0.5,0.15);
	drawVec2Array(E,20,0.0,0.25);	
	drawParticleArray(P,4);
}