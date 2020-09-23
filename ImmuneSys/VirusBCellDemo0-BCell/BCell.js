// B细胞群体的设置
// 细胞数量
var BCellNum = 10;

// B细胞的属性——变量
// * 位置、速度
var BCellPos;
var BCellVel;

// B细胞的能力——function
// * 初始化
// * 显示
// * 巡逻
// 释放抗体
// 搜寻

function InitBCells()
{
	BCellPos = new Array();
	BCellVel = new Array();
	for(var i=0;i<BCellNum;i++)
	{
		var pos = 
			createVector(
				random(0,width),random(0,height));
		var vel = 
			createVector(random(-5,5),random(-5,5));
		BCellPos[i] = pos;
		BCellVel[i] = vel;
	}

}

function BCellRender()
{
	push();
	for(var i=0;i<BCellNum;i++)
	{
		var p = BCellPos[i];
		
		stroke(0);
		fill(255);
		ellipse(p.x,p.y,8,8);
	}
	pop();
}

function BCellProduceAntibody(dt)
{
	for(var i=0;i<BCellNum;i++)
	{
		var p = BCellPos[i];
		AddAtCanvas(
			Antibody, 0.01*dt, antiMax, p.x,p.y);

	}
}

function BCellWander(dt)
{
	for(var i=0;i<BCellNum;i++)
	{
		var p = BCellPos[i];
		var v = BCellVel[i];
		p.x += v.x * dt;
		p.y += v.y * dt;

		if(p.x<0 )
		{
			p.x += width;
		}
		else if(p.x>width)
		{
			p.x -=width;
		}
		if(p.y<0)
		{
			p.y += height;
		}
		else if(p.y>height)
		{
			p.y -= height;
		}

		BCellPos[i]=p;
	}
}


function BCellSeekVirus(dt, V)
{
	for(var i=0;i<BCellNum;i++)
	{
		var p = BCellPos[i];// 自己当前位置
		var v = BCellVel[i];// 自己当前速度
		// 在附近找一个病毒多的位置作为目标
		// 在附近的一个半径范围内，随机比较10个目标，
		// 选病毒最多的目标
		var senseRadius = width/8;
		var targetX = p.x;
		var targetY = p.y;
		var virusAmtMax = 0;
		for(var k=0;k<10;k++)
		{
			var radius = random(0,senseRadius);
			var theta = random(0,TWO_PI);
			var offsetX = radius * cos(theta);
			var offsetY = radius * sin(theta);

			var detectX = p.x + offsetX;
			var detectY = p.y + offsetY;

			var c = CanvasX2FieldC(detectX);
			var r = CanvasY2FieldR(detectY);
			if(detectX<0||detectX>width||detectY<0||detectY>height)
			{
				continue;
			}

			var virusAmt = Virus[c][r];

			if(virusAmt>virusAmtMax)
			{
				targetX = detectX;
				targetY = detectY;
				virusAmtMax = virusAmt;
			}
		}

		// 生成一个期望速度：自己的速度朝向该目标
		var targetPos = createVector(targetX,targetY);
		var desiredV = targetPos.sub(p);
		desiredV = desiredV.limit(5);

		// 生成”转向力“： 将当前速度调整向期望速度
		var turnForce = desiredV.sub(v);
		turnForce = turnForce.limit(5);
		turnForce = turnForce.add(dt);

		var v2 = v.add(turnForce);// 改变速度
		BCellVel[i] = v2;
	}
}

