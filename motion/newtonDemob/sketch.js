var pos; // 位置
var vel; // 速度
var acc; // 加速度
var mass; // 质量
var dt = 0.1;
var mousePower = 1.0;
var resistFactor = -0.01;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);

	pos = 
		createVector(width/2,height/2);
	vel = 
		createVector(10,10);
	acc = 
		createVector(0,0);
	mass = 1;
}

// 函数draw()：作画阶段
function draw() {
	fill(255,20);// 填充白色
	rect(-5,-5,width+10,height+10);

	acc = createVector(0,0);
	var wind = createVector(0.5,0);
	applyForce(wind);
	var gravity = createVector(0,1);
	applyForce(gravity);
	if (mouseIsPressed) {
		var forceToMouse = 
			createVector(mouseX-pos.x, mouseY-pos.y);
		forceToMouse.mult(mousePower);
    	applyForce(forceToMouse);
  	}
  	var resistF = computeResist(vel);
  	applyForce(resistF);
	//print("acc" + acc + " vel:" + vel);

	newtonUpdate();

	if(pos.x>=width||pos.x<=0)
	{
		vel.x = -vel.x;
	}
	else if(pos.y>=height||pos.y<=0)
	{
		vel.y = -vel.y;
	}

	push();
	fill(255);
	ellipse(pos.x,pos.y,10,10); // 画圆形
	pop();
}

function computeResist(v)
{
	var f = createVector(0,0);
	
	// 得到速度的方向
	var vdir = v.copy();
	vdir.normalize();
	
	// 得到速率的平方
	var spd = v.mag();
	var spdSqr = spd*spd;

	// 算出阻力
	var rs = resistFactor*spdSqr;
	var f = p5.Vector.mult(
		vdir, rs);
	print("f"+ f);
	
	return f;
}

function applyForce(f)// f -力矢量
{
	//acc = p5.Vector.div(f,mass);
	var deltaAcc = p5.Vector.mult(f,1/mass);
	acc.add(deltaAcc);
	//acc = p5.Vector.add(acc,deltaAcc); 
}

function newtonUpdate()
{
	// 用加速度来更新速度
	var accxdt = p5.Vector.mult(acc,dt);
	var velNext = 
		p5.Vector.add(vel, accxdt);
	vel = velNext;

	// 用速度更新位置
	var posNext = 
		p5.Vector.add(pos, p5.Vector.mult(vel,dt));
	pos = posNext;
}



