var S = 15;
var x,y;
var a = 0.5;
var b = 1.0;
var dt = 0.08;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
	x = random(-S,S);
	y = random(-S,S);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色

	if(mouseIsPressed)
	{
		x = (mouseX-width/2)/S;
		y = (mouseY-height/2)/S;
	}

	StepDE(dt);
	drawParticle();
}

function StepDE(dt)
{
	var dx = sin(a*y)*dt;
	var dy = cos(b*x)*dt;

	x += dx;
	y += dy;
}

function drawParticle()
{
	push();
	translate(width/2,height/2);
	scale(width/24,height/24);
	strokeWeight(0.02);
	ellipse(x,y,0.5,0.5);
	pop();
}