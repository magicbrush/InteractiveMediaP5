var S = 15;
var num = 1000;
var X,Y;
var a = 1.5;
var b =1;
var dt = 0.045;
var zoom = 0.8;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
	X = new Array();
	Y = new Array();
	for(var i=0;i<num;i++)
	{
		X[i] = random(-S,S);
		Y[i] = random(-3.14,3.14);
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
		var r = X[i];
		var theta = Y[i];

		var dr = sin(a*theta)*dt;
		var dtheta = 0.33*cos(b*r)*dt;

		r += dr;
		theta += dtheta;

		X[i] = r;
		Y[i] = theta;
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
		var r = X[i];
		var theta = Y[i];
		var x = r*sin(theta);
		var y = r*cos(theta);
		ellipse(x,y,0.2,0.2);
	}
	pop();
}