function randVel()
{
	var deltaV = createVector(random(-1,1),random(-1,1));
	deltaV.mult(random(0,1.5));
	this.vel.add(deltaV);
}

function rotVel()
{
	var force = createVector(this.vel.x,this.vel.y);
	force.setMag(1.0);
	force.rotate(TWO_PI/4);
	force.mult(this.q);
	//var deltaV = createVector(random(-1,1),random(-1,1));
	
	this.accelerate(force,1);
}

// 函数setup() ：准备阶段
function agent(pos,vel,q) {
	 this.pos = pos;// 位置
	 this.vel = vel; // 速度
	 this.behavior = null;
	 this.q = q;

	 this.update = function(dt)
	 { 
	 	if(this.behavior!=null)
	 	{
	 		this.behavior();
	 	}

	 	this.vel.limit(3);
	 	// 按照自己的速度改变位置
	 	var movement = this.vel;
	 	movement.mult(dt);
	 	this.pos.add(movement);

	 	// 如果超出屏幕范围，跳转到屏幕另一边
	 	if(this.pos.x>width)
	 	{
	 		this.pos.x-=width;
	 	}
	 	else if(this.pos.x<0)
	 	{
	 		this.pos.x+= width;
	 	}
	 	else if(this.pos.y>height)
	 	{
	 		this.pos.y-=height;
	 	}
	 	else if(this.pos.y<0)
	 	{
	 		this.pos.y+=height;
	 	}
	 }

	 this.draw = function()
	 {
	 	angle = atan2(this.vel.y,this.vel.x);
	 	push();
	 	translate(this.pos.x,this.pos.y);
	 	var crA = color(255,0,0,255);
	 	var crB = color(0,255,0,255);
	 	var t = map(this.q,-1,1,0,1);
	 	var cr = lerpColor(crA,crB,t);
	 	fill(cr);
	 	rotate(angle);
	 	strokeWeight(0.33);
	 	scale(1.5*abs(this.q));
	 	triangle(-4,-4,-4,4,10,0);
	 	pop();
	 }

	 this.accelerate = function(acc,dt)
	 {
	 	var deltaV = acc;
	 	deltaV.mult(dt);
	 	this.vel.add(deltaV);
	 }

	 this.seek = function(targetPos,dt)
	 {
	 	var apos = this.pos;
		var acc = p5.Vector.sub(targetPos,apos);

		acc.limit(0.3);
		//var acc = createVector(random(-1,1),random(-1,1));
		this.accelerate(acc,dt);
	 }

	 this.ApplyB = function(B,dt)
	 {
	 	var pos = this.pos;
	 	var x = floor(pos.x)%width;
	 	var y = floor(pos.y)%height;
	 	var BValue = B[x][y];

	 	var force = createVector(this.vel.x,this.vel.y);
	 	force.setMag(1);
	 	force.rotate(TWO_PI/4);
	 	force.mult(BValue*this.q);

	 	this.accelerate(force,dt);
	 }

	 this.ApplyE = function(E,dt)
	 {
		var pos = this.pos;
	 	var x = constrain(floor(pos.x),0,width-1);
	 	var y = constrain(floor(pos.y),0,height-1);
	 	var EVec = E[x][y];

	 	var force = createVector(EVec.x,EVec.y);
	 	force.mult(this.q);
	 	//force.x = random(-5,5);
	 	this.accelerate(force,dt);
	 }

	 this.seek2 = function(targetPos,dt)
	 {
	 	var apos = this.pos;

	 	// 期望的速度 = 目标位置-当前位置
	 	var expectedVel = 
	 		p5.Vector.sub(targetPos,apos);

	    // 加速度 = 期望速度-实际的速度
		var acc = p5.Vector.sub(expectedVel,this.vel);

		acc.limit(0.3);
		//var acc = createVector(random(-1,1),random(-1,1));
		this.accelerate(acc,dt);
	 }

	 this.avoid = function(another,dt)
	 {
	 	var mypos = this.pos;
	 	var hisPos = another.pos;
	 	var offset = p5.Vector.sub(hisPos,mypos);
	 
	 	if(offset.mag()<50)
	 	{
	 		var acc = p5.Vector.sub(mypos,hisPos);
	 		acc.mult(this.q*another.q);
	 		acc.limit(0.2);
	 		this.accelerate(acc,dt);
	 	}
	 }

	 this.align =function(another,dt)
	 {
	 	var mypos = this.pos;
	 	var hisPos = another.pos;
	 	var offset = p5.Vector.sub(hisPos,mypos);
	 
	 	if(offset.mag()<25)
	 	{
	 		var hisVel = another.vel;
	 		var myVel = this.vel;
	 		var acc = p5.Vector.sub(hisVel,myVel);
	 		acc.mult(this.q*another.q);
	 		acc.limit(0.1);
	 		this.accelerate(acc,dt);
	 	}

	 }

}
