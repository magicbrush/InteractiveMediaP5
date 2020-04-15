// 场量
var Virus;  // 病毒
var Antibody; // 抗体

// 智能体
var BCells; // B细胞
var bCellNum = 10;

// 尺寸设置
var w = 400;// 画布尺寸
var h = 400;
var cols = 40;// 阵列尺寸
var rows = 40;

// 动力学参数
var dt = 0.1; // 时间步长
var k = 0.01; // 病毒扩散率
var virusIncRate = 0.2; // 病毒增殖速率
var virusMax = 10.0; // 病毒极限量
var l = 0.05; // 抗体扩散率
var antiMax = 10.0; // 抗体极限量
var antiEffect = 1; // 抗体效能
var antiExhaust = 1; // 抗体消耗率

// 显示效果设置
var crVirusMin;
var crVirusMax;
var crAntiMin;
var crAntiMax;

// 交互参数
var addVirusSpd = 50.0; // 增加病毒的速度

function setup() {
	createCanvas(w,h);
	Virus = CreateCellArray(cols,rows);
	Virus = InitCells_Rand(0,5,Virus);
	Antibody = CreateCellArray(cols,rows);
	//Antibody = InitCells_Rand(0,1,Antibody);

	crVirusMin = color(255,255,255,0);
	//crVirusMin.setAlpha(0);
	crVirusMax = color(255,0,0,255);
	crAntiMin = color(255,255,255,0);
	crAntiMax = color(0,255,255,125);

	BCells = new Array();
	for(var i=0;i<bCellNum;i++)
	{
		var p = createVector(
			random(0,width),
			random(0,height));
		var v = createVector(
			random(-5,5),
			random(-5,5));
		v = v.normalize()
		v = v.mult(8);
		var prodSpd = 10.0;
		// 构造一个B细胞个体B，
		// 具有一组属性和能力
		B = {
			// 属性
		  	position: p, 
		  	velocity: v,
		  	productionSpd: prodSpd,
		  	seekTrial: 10,
		  	seekRadius: 30,
		  	maxSpd:8,
		  	maxAcc:5,
		  	// 能力
		  	render: function() 
		  	{  
	    		push();
	    		stroke(0,0,0,150);
	    		ellipse(this.position.x,this.position.y,14,14);
	  			pop();
	  		},
	  		step: function(dt)
	  		{
	  			// wander: velocity change
	  			var angle = atan2(this.velocity.y,this.velocity.x);
	  			angle += random(-0.3,0.3);
	  			var spd = this.maxSpd;
	  			var x = spd * cos(angle);
	  			var y = spd * sin(angle);
	  			this.velocity = createVector(x,y);

	  			// positin change
	  			this.position.x += this.velocity.x*dt;
	  			this.position.y += this.velocity.y*dt;
	  			if(this.position.x>width+10)
	  			{
	  				this.position.x -=(width+10);
	  			}
	  			else if(this.position.x<-10)
	  			{
	  				this.position.x +=width+10;
	  			}
	  			if(this.position.y>height+10)
	  			{
	  				this.position.y-=(height+10);
	  			}
				else if(this.position.y<-10)
				{
					this.position.y += (height+10);
				}
	  		},

	  		seekVirus: function(V,dt)
	  		{
	  			var vamt =0.0;
	  			var seekPos = this.position;
	  			for(var i = 0;i<this.seekTrial;i++)
	  			{
	  				var seekDir = random(0,TWO_PI);
		  			var seekBiasX = this.seekRadius * cos(seekDir);
		  			var seekBiasY = this.seekRadius * sin(seekDir);
		  			var seekOffset = 
		  				createVector(seekBiasX,seekBiasY);
		  			var tgtPos =
		  				 p5.Vector.add(this.position,seekOffset);
		  			var cr = this.getCRofXY(tgtPos);
		  			if(cr.x<0||cr.x>=cols||cr.y<0||cr.y>=rows)
		  			{
		  				continue;
		  			}
		  			var vAmtTgt = V[cr.x][cr.y];
		  			if(vAmtTgt>vamt)
		  			{
		  				seekPos = tgtPos;
		  				vamt = vAmtTgt;
		  			}
	  			}
	  			
	  			var intendVel = 
	  				p5.Vector.sub(seekPos,this.position);
	  			intendVel = 
	  				p5.Vector.mult(intendVel.normalize(),this.maxSpd);
	  			var acc = p5.Vector.sub(intendVel,this.velocity);
	  			acc = acc.limit(this.maxAcc);
	  			var v = this.velocity;
	  			var v2 = p5.Vector.add(v,acc.mult(dt));
	  			this.velocity = v2;
	  		},

	  		genAntibody: function(dt,V,A)
	  		{
	  			var cr = XY2CR(this.position);
	  			var c = floor(cr.x);
	  			var r = floor(cr.y);
	  			if(c<0||c>=cols||r<0||r>=rows)
	  			{
	  				return 0;
	  			}
	  			var v = V[c][r];
	  			var v2 = constrain(v,0,1);
	  			var amt = v2 * this.productionSpd * dt;
	  			return amt;
	  		},

	  		getCR: function()
	  		{
	  			var cr = this.getCRofXY(this.position);
	  			return cr;
	  		},

	  		getCRofXY: function(xy)
	  		{
	  			var cr = XY2CR(xy);
	  			var cr2 = cr;
	  			cr2.x = floor(cr.x);
	  			cr2.y = floor(cr.y);
	  			return cr2;
	  		}
	  		
		};
		BCells[i] = B;
	}

}

// 函数draw()：作画阶段
var LastBDispT = 0.0;
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	var tNow = millis()/1000;
	var passedT = tNow - LastBDispT;
	drawCellAsRects(
			Virus,
			0,virusMax,
			crVirusMin,crVirusMax,
			GetScaleX(), GetScaleY());

	drawCellAsRects(
		Antibody,
		0,antiMax,
		crAntiMin,crAntiMax,
		GetScaleX(), GetScaleY());
			

	StepFields(dt);
	StepAgents(dt);
	
	if(mouseIsPressed)
	{
		var xy = createVector(mouseX,mouseY);
		var cr = XY2CR(xy);
		Virus[floor(cr.x)][floor(cr.y)] += 
			addVirusSpd*dt;
	}

}

function GetScaleX()
{
	return w/cols;
}

function GetScaleY()
{
	return h/rows;
}




function keyPressed() {
	print(keyCode);
    if (key === 'A') {
    	
    } 
}


