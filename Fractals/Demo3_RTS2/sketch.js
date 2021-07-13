var Sprites;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	Sprites = new Array();
	Sprites[0] = new sprite(
		Shape2, TWO_PI/3,
		createVector(0,0),
		createVector(0.95,0.95),
		color(255,255,255),8);
	
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
	this.level = level;

	if(level>0)
	{
		this.subsprites = new Array();
		//var cr2 = cr;
		
		for(var i=0;i<3;i++)
		{
			var cr2 = color(random(0,255),random(0,255),random(0,255));
			var offset2 = createVector(50,0);
			var scaler2 = createVector(scaler.x,scaler.y);
			scaler2.mult(random(0.9,0.98));
			this.subsprites[i] = 
		 		new sprite(
		 			shapeFcn,
		 			i*theta,
		 			offset2,
		 			scaler2,
		 			cr2,
		 			level-1);
		}
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
		if(this.subsprites!=null)
		{
			for( var i=0;i<this.subsprites.length;i++)
			{
				this.subsprites[i].draw();
			}			
		}
		scale(1/this.scaler.x,1/this.scaler.y);
		translate(-this.offset.x,-this.offset.y);
		rotate(-this.theta);
		//print(this.level);
	}
}
