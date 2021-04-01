var P;
var PNum = 200;

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
		P[i].step(B,E,50*dt);
	}
}

// 显示粒子系统
function DrawParticleSys()
{
	drawParticleArray(P);	
}

// ---------- 初始化 ----------------------//
function Particle(pos,pcolor,diameter,edgeWt)
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

function InitParticles(num)
{
	P = new Array();
	for(var i=0;i<num;i++)
	{
		var pos = createVector(random(0,w),random(0,h));
		var pcr = color(random(120,255),random(120,255),random(120,255),50);
		var psize = random(2,8);
		P[i] = new Particle(pos,pcr,psize,0.33);
	}
	return P;
}

function InitPColor(num)
{
	PColor = new Array();
	for(var i=0;i<num;i++)
	{
		var px = random(0,w);
		var py = random(0,h);
		P[i] = createVector(px,py);		
		PColor[i] = 
			color(random(200,255),random(200,255),random(200,255),50);
	}	
	return PColor;
}

// ----------------- 显示 ------------------------//
function drawParticleArray(P)
{
	for(var i=0;i<P.length;i++)
	{
		P[i].render();
	}
}