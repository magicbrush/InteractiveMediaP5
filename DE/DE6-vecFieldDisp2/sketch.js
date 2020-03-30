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
	createCanvas(400,400);
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
			random(200,255),
			random(200,255),
			random(200,255),
			random(200,250));
	}
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	StepDE(dt);
	//drawParticles();
	drawVField();

	push();
	strokeWeight(2.0);
	translate(-width/2,-height/2);
	stroke(0);
	line(0,height/2,width,height/2);
	line(width/2,0,width/2,height);
	pop();
}

function drawVField()
{
	var arrayNum =32;
	var step = 2*S/arrayNum;
	translate(width/2,height/2);
	for(var i=0;i<arrayNum;i++)
	{
		for(var j=0;j<arrayNum;j++)
		{
			push();
			scale(zoom*width/12,zoom*height/12);
			translate(-S+i*step, -S+j*step);
			fill(255,0,0,180);
			strokeWeight(0.01);
			var x = -S + i*step;
			var y = -S + j*step;
			var vx = 0.5*sin(a*y);
			var vy = 0.5*sin(b*x);
			var spd = sqrt(vx*vx + vy*vy);
			var theta = atan2(vy,vx);
			rotate(theta)
			line(-spd,0,spd,0);
			triangle(0.1,0.2*spd,0.1,-0.2*spd,spd,0);
			pop();
		}
	}
	

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
	//strokeWeight(0.02);
	noStroke();
	strokeWeight(0);
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