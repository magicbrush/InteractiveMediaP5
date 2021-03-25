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
			deltaP.mult(4*dt);
			
			deltaP.rotate(HALF_PI);
			deltaP.mult(2*BValue/this.diameter);
			var bias =  createVector(random(-1,1),random(-1,1));
			bias.mult(2/this.diameter);
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


function ParticleC(pos,pcolor,diameter,edgeWt)
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


		push();
		colorMode(HSB,1,1,1,1);
		var ch = hue(this.color);
		var cs = saturation(this.color);
		var cb = brightness(this.color);
		var ca = alpha(this.color);
		ch += 0.001*(BValue+atan2(EVec.y,EVec.x))*dt;
		if(ch>1)
		{
			ch-=1;
		}
		else if(ch<0)
		{
			ch+=1;
		}
		var cr0 = color(ch,cs,cb,ca);
		this.color = cr0;
		pop();


		for(var i=0;i<20;i++)
		{
			this.oneStep(BValue,EVec,dt);
		}
		
	}

	this.oneStep = function(BValue,EVec,dt)
	{
		var p = this.position;
		if(EVec.mag()<0.0001)
		{
			p = createVector(random(0,w),random(0,w));
		}
		else
		{
			var deltaP = createVector(EVec.x,EVec.y);
			deltaP.mult(dt);
			push();
			colorMode(HSB,1,1,1,1);
			var ch = hue(this.color);
			pop();
			deltaP.rotate(TWO_PI*ch);
			deltaP.mult(2*BValue/this.diameter);
			var bias =  createVector(random(-1,1),random(-1,1));
			bias.mult(0.5/this.diameter);
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
		
		var rvalue = random(0,1);
		if(rvalue<0.5)
		{
			var psize = random(10,18);
			var pcr = 
				color(random(100,200),random(200,255),random(200,255),random(2,5));
			P[i] = new ParticleA(pos,pcr,psize,0.0);
		}
		else if(rvalue>=0.5&&rvalue<0.6)
		{
			push();
			var psize = random(2,5);
			colorMode(HSB,1,1,1,1);
			var pcr = 
				color(random(0,1),random(0.7,0.9),random(0.2,0.5),random(0.7,0.9));
			//var pcr = color(0,255,0,255);
			P[i] = new ParticleC(pos,pcr,psize,0.01);
			pop();
		}
		else
		{
			var psize = random(1,4);
			var pcr = 
				color(random(200,255),random(0,150),random(0,150),random(120,200));
			P[i] = new ParticleB(pos,pcr,psize,0.01);
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