// 第一个小球的属性：标量表达
var x,y; // ball 1 的位置
var xSpd,ySpd;// ball 1 的速度
// 第二个小球的属性： 矢量表达
var pos; // ball 2 的位置
var vel; // ball 2 的速度
//var ball2Pos;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(480,480);
	rectMode(CENTER);
	//pos = createVector(width/2,height/2);
	x = 10+width/2;
	y = height/2;
	xSpd = 1;
	ySpd = 2;

	pos = createVector(100,300);
	vel = createVector(-1.5,0.8);
}

// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);

	// ball 1
	x += xSpd;
	y += ySpd;

	/*ball1_position = 
		ball1_position + ball1_velocity * dt;*/

	if(x>width)
	{
		x = x-width;
	}
	if(y>height)
	{
		y = y-height;
	}
	ellipse(x,y,10,10);


	// ball2
	//pos.x = pos.x +vel.x;
	//pos.y = pos.y +vel.y;

	//pos(t+dt) = pos(t) + vel * dt;
	pos.add(vel); // 非静态函数形式
	//vel.add(pos);
	//var pos2 = p5.Vector.add(pos,vel); // 静态函数形式
	//pos' = pos + vel*dt;
	if(pos.x<0)
	{
		pos.x = pos.x+width;
	}
	if(pos.y>height)
	{
		pos.y = pos.y-height;
	}
	push();
	fill(255,0,0);
	ellipse(pos.x,pos.y,15,15);
	pop();
}


