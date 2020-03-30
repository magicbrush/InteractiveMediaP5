var S = 15;
var num = 1000;
var X,Y;
var DX,DY;
var DDX,DDY;
var Color;
var a = 0.55;
var b =0.7;
var dt = 0.045;
var zoom = 0.5;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
	colorMode(HSB,360,100,100,100);
	X = new Array();
	Y = new Array();
	DX = new Array();
	DY = new Array();
	DDX = new Array();
	DDY = new Array();
	Color = new Array();
	for(var i=0;i<num;i++)
	{
		X[i] = random(-S,S);
		Y[i] = random(-S,S);
		DX[i] = random(-0.03,0.03);
		DY[i] = random(-0.03,0.03);
		DDX[i] = 0;
		DDY[i] = 0;
		Color[i] = color(
			random(0,360),
			random(20,80),
			random(50,100),
			random(60,100));
	}
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	StepDE(dt);
	drawParticles0();
}

function StepDE(dt)
{
	for(var i=0;i<num;i++)
	{
		var x = X[i];
		var y = Y[i];
		var dx = DX[i];
		var dy = DY[i];

		var ddx = 0.01*sin(a*dy)*dt;
		var ddy = 0.01*sin(b*dx)*dt;

		dx += ddx;
		dy += ddy;

		x += dx;
		y += dy;

		X[i] = x;
		Y[i] = y;
		DX[i] = dx;
		DY[i] = dy;
		DDX[i] = ddx;
		DDY[i] = ddy;
	}
}

function drawParticles0()
{
	push();
	translate(width/2,height/2);
	scale(zoom*width/12,zoom*height/12);
	strokeWeight(0.02);
	colorMode(HSB,360,100,100,100);
	for(var i=0;i<num;i++)
	{
		var dx = DX[i];
		var dy = DY[i];
		var ddx = DDX[i];
		var ddy = DDY[i];
		strokeWeight(0.02);
		ellipse(X[i],Y[i],0.5,0.5);
	}
	pop();
}

function drawParticles()
{
	push();
	translate(width/2,height/2);
	scale(zoom*width/12,zoom*height/12);
	strokeWeight(0.02);
	colorMode(HSB,360,100,100,100);
	for(var i=0;i<num;i++)
	{
		var dx = DX[i];
		var dy = DY[i];
		var ddx = DDX[i];
		var ddy = DDY[i];
		var acc = 100*sqrt(ddx*ddx + ddy*ddy);
		var spd = 1.0/(0.12+100.0*sqrt(dx*dx + dy*dy));
		var cr = Color[i];
		var h = hue(cr);
		var s = saturation(cr);
		var b = brightness(cr);
		var a = alpha(cr);
		fill(h,0.015*s/acc,b/spd,a);
		strokeWeight(acc*0.1);
		ellipse(X[i],Y[i],spd,spd);
	}
	pop();
}