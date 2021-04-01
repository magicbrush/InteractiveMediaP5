// 函数setup() ：准备阶段
function agent(pos,vel) {
	 this.pos = pos;// 位置
	 this.vel = vel; // 速度

	 this.update = function(dt)
	 {
	 	var movement = this.vel;
	 	movement.mult(dt);
	 	this.pos.add(movement);

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
	 	push();
	 	translate(this.pos.x,this.pos.y);
	 	fill(255);
	 	ellipse(0,0,8,8);
	 	pop();
	 }

}
