var B;
var E;
var DE;
var w = 400;
var h = 400;

var P;
var PNum = 300;
var dt = 1;
var k = 1;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(w,h);

	// Init B and E
	B = CreateValueArray(w,h);
	//B = InitValueArray_SinThetaSinRadius(B,0.1,0.1,0.15,3);
	//B = InitValueArray_KX(B,0.01);
	//B = InitValueArray_aXbY(B,0.01,0);
	B = InitValueArray_cosRadius(B,0.02,1);
	E = CreateVector2Array(w,h);
	//E = InitVec2Array_RTheta(E,0.1,0.1,0.15,3);
	DE = CreateVector2Array(w,h);

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

	//P = MoveParticleByE(P,E,dt);
	/*
	var u = 0.01*cos(millis()/3000);
	var v = 0.01*sin(millis()/3000)
	B = InitValueArray_aXbY(B,u,v);
	*/
	DE = CalDEbyB(B,DE,k);

	drawValueArray(B,20,0.5,0.15);
	drawVec2Array(E,20,0.0,0.25,color(0,0,0,125));	
	drawVec2Array(DE,20,0.0,5,color(0,200,0,200));	
	//drawParticleArray(P,4);
}