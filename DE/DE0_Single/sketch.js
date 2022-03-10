var S = 15;
var x,y; // 位置
var a = 0.5; // 参数a,b
var b = 1.0;
var dt = 0.08; // dt

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
	x = random(-0.5*S,0.5*S);
	y = random(-0.5*S,0.5*S);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色

	// 运行微分方程
	var dx = sin(a*y)*dt;
	var dy = cos(b*x)*dt;
	x += dx;
	y += dy;

	drawParticleAtXY(); // 显示粒子
}

function drawParticleAtXY()
{
	push();
	translate(width/2,height/2);
	scale(width/24,height/24);
	strokeWeight(0.02);
	ellipse(x,y,0.5,0.5);
	pop();
}