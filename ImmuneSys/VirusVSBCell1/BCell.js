// 辅助函数
function BCell(pos)
{
	this.position = pos;
	this.velocity = createVector(0,0);
	this.render = function()
	{
		ellipse(position.x,position.y,8,8);
	}
	this.step = function(dt)
	{

	}

}