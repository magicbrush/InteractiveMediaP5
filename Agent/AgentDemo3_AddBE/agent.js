// 函数setup() ：准备阶段
function agent(pos,vel,q) {
	 this.pos = pos;// 位置
	 this.vel = vel; // 速度
	 this.q = q;

	 this.update = function(dt)
	 {
	 	this.vel.limit(5);

	 	// 用速度改变位置
	 	var movement = this.vel;
	 	movement.mult(dt);
	 	this.pos.add(movement);

	 	// 从屏幕的一边跳转到另一边
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
	 	var angle = atan2(this.vel.y,this.vel.x);
	 	push();
	 	translate(this.pos.x,this.pos.y);
	 	var crDisp = color(255,0,0);
	 	if(this.q<0)
	 	{
	 		crDisp = color(0,255,0);
	 	}
	 	fill(crDisp);
	 	rotate(angle);
	 	scale(abs(this.q))
	 	//ellipse(0,0,8,8);
	 	triangle(-4,4,-4,-4,8,0);
	 	pop();
	 }

	 this.accelerate = function(acc,dt)
	 {
	 	 var deltaV = createVector(acc.x,acc.y);
	 	 deltaV.mult(dt);

	 	 this.vel.add(deltaV);
	 }

	 this.seek = function(targetPos,dt)
	 {
	 	// 形成意图
	 	var T = targetPos;
		var P = this.pos;

		// 形成行为
		var acc = p5.Vector.sub(T,P);
		acc.limit(0.1);

		// 执行行为
		this.accelerate(acc);
	 }

	 this.seek2 = function(targetPos,dt)
	 {
	 	// 形成意图
	 	var T = targetPos;
		var P = this.pos;
		var expectV = p5.Vector.sub(T,P);

		// 形成行为
		var acc = p5.Vector.sub(expectV,this.vel);
		acc.limit(0.1);

		// 执行行为
		this.accelerate(acc,dt);
	 }

	 this.seek3 = function(targetPos,dt)
	 {
	 	// 形成意图
	 	var T = targetPos;
		var P = this.pos;
		var expectV = p5.Vector.sub(T,P);

		// 形成行为
		var acc = p5.Vector.sub(expectV,this.vel);
		acc.limit(0.1);
		if(expectV.mag()<20)
		{
			acc.mult(-5);
		}
		// 执行行为
		this.accelerate(acc,dt);
	 }

	 this.avoid = function(another,dt)
	 {
	 	var P2 = another.pos;
	 	var PThis = this.pos;
	 	var offset = p5.Vector.sub(PThis,P2);
	 	var dist = offset.mag();
	 	if(dist<30)
	 	{
	 		var acc = p5.Vector.sub(PThis,P2);
	 		acc.mult(10/(dist+10))
	 		// 执行行为
			this.accelerate(acc,dt);
	 	}
	 }

	 this.align = function(another,dt)
	 {
	 	var P2 = another.pos;
	 	var PThis = this.pos;
	 	var offset = p5.Vector.sub(PThis,P2);
	 	var dist = offset.mag();
	 	if(dist<70)
	 	{
	 		var VExpected = another.vel;
	 		var acc = p5.Vector.sub(VExpected,this.vel);
	 		acc.mult(this.q*another.q);
	 		acc.limit(0.1);
	 		this.accelerate(acc,dt);
	 	}
	 }

	 this.orbit = function(another,dt)
	 {
	 	var P2 = another.pos;
	 	var PThis = this.pos;
	 	var offset = p5.Vector.sub(PThis,P2);
	 	var dist = offset.mag();
	 	if(dist<150)
	 	{
	 		var VExpected = another.vel;
	 		VExpected.rotate(TWO_PI/4);
	 		var acc = p5.Vector.sub(VExpected,this.vel);
	 		acc.limit(0.1);
	 		this.accelerate(acc,dt);
	 	}
	 }

	 this.addE = function(E,dt)
	 {
	 	var x = constrain(round(this.pos.x),0,width-1);
	 	var y = constrain(round(this.pos.y),0,height-1);
	 	var EVector = E[x][y];

	 	var acc = createVector(EVector.x,EVector.y);
	 	acc.mult(this.q);
	 	this.accelerate(acc,dt);
	 }

	 this.addB = function(B,dt)
	 {
	 	var x = constrain(round(this.pos.x),0,width-1);
	 	var y = constrain(round(this.pos.y),0,height-1);
	 	var BValue = B[x][y];

	 	var acc = createVector(this.vel.x,this.vel.y);
	 	acc.rotate(TWO_PI/4);
	 	acc.setMag(this.q * BValue);
	 	this.accelerate(acc,dt);
	 }

}
