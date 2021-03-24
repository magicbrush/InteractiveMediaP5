var P;
var PColor;
var PNum = 500;

// 初始化粒子系统
function InitParticleSys()
{
	P = InitParticles(PNum);
	PColor = InitPColor(PNum);	
}

// 更新粒子系统
function UpdaterParticleSys()
{
	P = MoveParticleByE(P,E,100*dt);
}

// 显示粒子系统
function DrawParticleSys()
{
	drawParticleArray(P,PColor,5);	
}




function InitParticles(num)
{
	P = new Array();
	for(var i=0;i<num;i++)
	{
		var px = random(0,w);
		var py = random(0,h);
		P[i] = createVector(px,py);
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

// 更新Particle
function MoveParticleByE(P,E,dt)
{
	rowNum = E.length;
	colNum = E[0].length;
	for(var i=0;i<P.length;i++)
	{
		var px = P[i].x;
		var py = P[i].y;
		var r = round(px)%rowNum;
		var c = round(py)%colNum;
		var evec = E[r][c];

		px += evec.x*dt;
		py += evec.y*dt;		
		
		if(px>rowNum)
		{
			px-=rowNum;
		}
		if(px<0)
		{
			px+= rowNum;
		}
		if(py>colNum)
		{
			py-=colNum;
		}
		if(py<0)
		{
			py+=colNum;
		}
		P[i].x = px;
		P[i].y = py;
	}
	return P;
}

// 显示粒子
function drawParticleArray(P,PColor,Size)
{
	for(var i=0;i<P.length;i++)
	{
		push();
		//translate(P[i].x,P[i].y);
		fill(PColor[i]);
		noStroke();
		ellipse(P[i].x,P[i].y,Size,Size);
		//ellipse(0,0,Size,Size);
		pop();
	}
}