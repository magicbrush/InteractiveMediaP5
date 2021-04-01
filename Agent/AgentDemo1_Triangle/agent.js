// 函数setup() ：准备阶段
function agent(pos,vel) {
	 this.pos = pos;// 位置
	 this.vel = vel; // 速度

	 this.update = function(dt)
	 {
	 	this.vel.limit(5);
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
	 	fill(255);
	 	rotate(angle);
	 	scale(1.5,1.5);
	 	triangle(-3,-3,-3,3,8,0);
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
	 		acc.limit(0.1);
	 		this.accelerate(acc,dt);
	 	}

	 }

}
