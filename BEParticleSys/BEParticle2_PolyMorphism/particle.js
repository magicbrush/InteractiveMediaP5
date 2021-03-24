var P;
var PNum = 500;

// 初始化粒子系统
function InitParticleSys()
{
	P = InitParticles(PNum);	
}

// 更新粒子系统
function UpdateParticleSys()
{
	for(var i=0;i<P.length;i++)
	{
		P[i].step(B,E,33*dt);
	}
}

// 显示粒子系统
function DrawParticleSys()
{
	drawParticleArray(P);	
}

// ---------- 初始化 ----------------------//
function ParticleA(pos,pcolor,diameter,edgeWt)
{
	this.position = pos;
	this.color = pcolor;
	this.edgeWeight = edgeWt;
	this.diameter = diameter;
	this.render = function()
	{
		push();
		fill(this.color);
		strokeWeight(this.edgeWeight);
		ellipse(
			this.position.x,this.position.y,
			this.diameter,this.diameter);
		pop();
		
	}

	this.step = function(B,E,dt)
	{
		var p = this.position;

		var x = constrain(round(p.x),0,w-1);
		var y = constrain(round(p.y),0,h-1);
		//print("x:" + x + " y:" + y);
		var BValue = B[x][y];
		var EVec = E[x][y];
		
		if(EVec.mag()<0.0001)
		{
			p = createVector(random(0,w),random(0,w));
		}
		else
		{
			var deltaP = createVector(EVec.x,EVec.y);
			deltaP.mult(dt);
			//EVec.mult(dt);
			p.add(deltaP);
		}
		if(p.x>=w)
		{
			p.x -=w;
		}
		if(p.x<0)
		{
			p.x+= w;
		}
		if(p.y>=h)
		{
			p.y-=h;
		}
		if(p.y<0)
		{
			p.y+= h;
		}
		
		this.position = p;
	}
}

function ParticleB(pos,pcolor,diameter,edgeWt)
{
	this.position = pos;
	this.color = pcolor;
	this.edgeWeight = edgeWt;
	this.diameter = diameter;
	this.render = function()
	{
		push();
		fill(this.color);
		strokeWeight(this.edgeWeight);
		ellipse(
			this.position.x,this.position.y,
			this.diameter,this.diameter);
		pop();
		
	}

	this.step = function(B,E,dt)
	{
		var p = this.position;

		var x = constrain(round(p.x),0,w-1);
		var y = constrain(round(p.y),0,h-1);
		//print("x:" + x + " y:" + y);
		var BValue = B[x][y];
		var EVec = E[x][y];
		
		if(EVec.mag()<0.0001)
		{
			p = createVector(random(0,w),random(0,w));
		}
		else
		{
			var deltaP = createVector(EVec.x,EVec.y);
			deltaP.mult(5*dt);
			
			
			deltaP.rotate(HALF_PI);
			deltaP.mult(BValue);
			var bias =  createVector(random(-1,1),random(-1,1));
			deltaP.add(bias);
			p.add(deltaP);
		}
		if(p.x>=w)
		{
			p.x -=w;
		}
		if(p.x<0)
		{
			p.x+= w;
		}
		if(p.y>=h)
		{
			p.y-=h;
		}
		if(p.y<0)
		{
			p.y+= h;
		}
		
		this.position = p;
	}
}

function InitParticles(num)
{
	P = new Array();
	for(var i=0;i<num;i++)
	{
		var pos = createVector(random(0,w),random(0,h));
		
		if(random(0,1)<0.25)
		{
			var psize = random(7,15);
			var pcr = 
				color(random(100,200),255,255,random(20,40));
			P[i] = new ParticleA(pos,pcr,psize,0.0);
		}
		else
		{
			var psize = random(1.5,3);
			var pcr = 
				color(random(200,255),random(0,150),random(0,150),random(150,175));
			P[i] = new ParticleB(pos,pcr,psize,0.02);
		}
		
	}
	return P;
}

// ----------------- 显示 ------------------------//
function drawParticleArray(P)
{
	for(var i=0;i<P.length;i++)
	{
		P[i].render();
	}
}