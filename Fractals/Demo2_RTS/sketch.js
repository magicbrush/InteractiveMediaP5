var Sprites;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	Sprites = new Array();
	Sprites[0] = new sprite(
		Shape0, 1,
		createVector(0,0),
		createVector(0.9,0.9),
		color(255,255,255),15);
	
}

// 函数draw()：作画阶段
function draw() {
	//fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);
	//drawCircle5(width/2,height/2,width*0.8);
	
	push();
	translate(width/2,height/2);
	scale(3,3);
	for(var i=0;i<Sprites.length;i++)
	{
		Sprites[i].draw();
	}
	pop();
}

function sprite(shapeFcn, theta,offset,scaler, cr, level)
{
	this.shapeFcn = shapeFcn;
	this.theta = theta;
	this.offset = offset;
	this.scaler = scaler;
	this.cr = cr;

	if(level>0)
	{
		var cr2 = cr;
		cr2 = color(random(0,255),random(0,255),random(0,255));
		this.subsprite =
		 new sprite(shapeFcn,theta,offset,scaler,cr2,level-1);
	}
	else
	{
		this.subsprite = null;
	}
	
	this.draw = function()
	{
		rotate(this.theta);
		translate(this.offset.x,this.offset.y);
		scale(this.scaler.x, this.scaler.y);
		fill(this.cr);
		this.shapeFcn();
		if(this.subsprite!=null)
		{
			this.subsprite.draw();
		}
		scale(1/this.scaler.x,1/this.scaler.y);
		translate(-this.offset.x,-this.offset.y);
		rotate(-this.theta);
	}
}
