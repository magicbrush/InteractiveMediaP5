var S = 15;
var num = 1000;
var X,Y;
var DX,DY;
var Color;
var a = 0.55;
var b =0.7;
var dt = 0.045;
var zoom = 0.5;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(800,800); 
	X = new Array();
	Y = new Array();
	DX = new Array();
	DY = new Array();
	Color = new Array();
	for(var i=0;i<num;i++)
	{
		X[i] = random(-S,S);
		Y[i] = random(-S,S);
		DX[i] = 0;
		DY[i] = 0;
		Color[i] = color(
			random(125,255),
			random(125,255),
			random(125,255),
			random(180,240));
	}
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色

	StepDE(dt);
	drawParticles();
}

function StepDE(dt)
{
	for(var i=0;i<num;i++)
	{
		var x = X[i];
		var y = Y[i];

		var dx = sin(a*y)*dt;
		var dy = sin(b*x)*dt;

		x += dx;
		y += dy;

		X[i] = x;
		Y[i] = y;
		DX[i] = dx;
		DY[i] = dy;
	}
}

function drawParticles()
{
	push();
	translate(width/2,height/2);
	scale(zoom*width/12,zoom*height/12);
	strokeWeight(0.02);
	for(var i=0;i<num;i++)
	{
		var dx = DX[i];
		var dy = DY[i];
		var spd = 13*sqrt(dx*dx + dy*dy);
		fill(Color[i]);
		ellipse(X[i],Y[i],spd,spd);
	}
	pop();
}