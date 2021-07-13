var P;
var C;
var XMin = -100;
var XMax = 100;
var YMin = -100;
var YMax = 100;
var ZMin = -100;
var ZMax = 100;

var Alpha = 10;
var Beta = 8/3;
var Rho = 28;

var M;

var Scl = 5;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	P = new Array();
	C = new Array();
	for(var i=0;i<100;i++)
	{
		var x = random(XMin,XMax);
		var y = random(YMin,YMax);
		var z = random(ZMin,ZMax);
		P[i] = createVector(x,y,z);

		var r = random(0,255);
		var g = random(0,255);
		var b = random(0,255);
		C[i] = color(r,g,b);
	}

	M = createVector(
		random(XMin,XMax),
		random(YMin,YMax),
		random(ZMin,ZMax));
	
}

// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,2);
	rect(-10,-10,2*width,2*height);
	//drawCircle5(width/2,height/2,width*0.8);
	
	Step(0.0002,10);

	for(var i=0;i<800;i++)
	{
		M = Step_LorenZ(M.x,M.y,M.z,0.00002);
	}


	push();
	translate(width/2,height/2);
	scale(Scl,Scl);
	for(var i=0;i<P.length;i++)
	{
		d = map(P[i].z,-3,3,0,255);
		fill(C[i]);
		noStroke();
		ellipse(P[i].x,P[i].y,0.5,0.5);
	}
	strokeWeight(0.33);
	stroke(0);
	fill(255);
	ellipse(M.x,M.y,2,2);
	pop();
	
}

function mousePressed()
{
	var x = map(mouseX,0,width,-0.5*width/Scl,0.5*width/Scl);
	var y = map(mouseY,0,height,-0.5*height/Scl,0.5*height/Scl);
	var z = random(ZMin,ZMax);
	M= createVector(x,y,z);
}

function Step(dt,iter)
{
	for(k=0;k<iter;k++)
	{
		for(var i=0;i<P.length;i++)
		{
			P[i] = Step_LorenZ(P[i].x, P[i].y, P[i].z, dt);	

		}
		
	}
}

function Step_LorenZ(x,y,z,dt)
{
	var dx = dt * Alpha*(y-x);
	//print("dx:" + dx + " dt:" + dt + " alpha" + alpha + " y:"+y + " x:"+x);
	var dy = dt * (x*(Rho-z) -y);
	var dz = dt * (x*y-Beta*z);
	var p2 = createVector( x+dx, y+dy, z+dz);
	//print("x:" + x + " y:" + y + " dx: "+dx);
	return p2;
}

