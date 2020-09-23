// B细胞
var BCellAmt = 10;
var BCellSeekRadius = 20;
var BCellMaxSpd = 5;
var BCellPos; // 位置
var BCellVel; // 速度

// 初始化
function InitBCell()
{
	BCellPos = new Array();
	BCellVel = new Array();
	for(i=0;i<BCellAmt;i++)
	{
		// 初始化位置：画布上的随机位置
		BCellPos[i] = 
			createVector(random(0,width),random(0,height));
		
		// 初始化速度：固定速率，方向随机
		var vMag = 10;
		var vDir = random(0,TWO_PI);
		var vx = vMag * cos(vDir);
		var vy = vMag * sin(vDir);
		var v = createVector(vx,vy);
		BCellVel[i] = v;
	}
}

// 显示
function RenderBCells()
{
	push();
	for(var i=0;i<BCellPos.length;i++)
	{
		var pos = BCellPos[i];
		fill(255);
		stroke(0);
		ellipse(pos.x,pos.y,10,10);
	}
	pop();
}

// 更新
// 巡逻、制造抗体、搜寻病毒
function stepBCells(dt)
{
	// 移动
	BCellMove(dt);

	// 巡逻-加入随机性
	BCellRandChangeDir(dt);

	// 制造抗体： 对Antibody进行“增加”的操作
	BCellProduceAntibody(dt);

	// 搜寻病毒
	BCellSeekVirus(dt);

}

function BCellSeekVirus(dt)
{
	for(i=0;i<BCellAmt;i++)
	{
		// 在附近的一个半径范围内，
		// 找一个病毒量比较多的位置作为目标
		var posNow = BCellPos[i];
		var ViursMax = 0;
		var tgtPos = posNow.copy();
		for(k = 0;k<10;k++)
		{
			var seekR = 
				random(0,BCellSeekRadius);
			var seekTheta = 
				random(0,TWO_PI);
			var seekBiasX = seekR * cos(seekTheta);
			var seekBiasY = seekR * sin(seekTheta);
			var seekPos = posNow.add(seekBiasX,seekBiasY);

			if(seekPos.x>=width||seekPos.x<=0||seekPos.y>=height||seekPos.y<=0)
			{
				continue;
			}

			var seekPosC = canvasX2FieldC(seekPos.x);
			var seekPosR = canvasX2FieldC(seekPos.y);
			var virusAmt = Virus[seekPosC][seekPosR];
			if(virusAmt>ViursMax)
			{
				ViursMax = virusAmt;
				tgtPos = seekPos;
			}
		}

		// 实现追寻Seek功能：
		// 期望方向 = (目标位置 - 当前位置).normalize()
		// 期望速度 = 期望方向 * 最大速度
		// 转向力 = 期望速度 - 当前速度
		// 转向： 新的速度 = 当前速度 + 转向力*dt
		var intendDir = tgtPos.sub(posNow);
		intendDir = intendDir.normalize();
		var intendVel = intendDir.mult(BCellMaxSpd);
		var velNow = BCellVel[i];
		var turnForce = intendVel.sub(velNow);
		//print("turnForce:" + turnForce);
		var deltaVel = turnForce.mult(dt);
		var velNext = velNow.add(deltaVel);
		print("velNext:" + velNext);
		BCellVel[i] = velNext;
	}
}

function BCellProduceAntibody(dt)
{
	for(i=0;i<BCellAmt;i++)
	{
		var pos = BCellPos[i];

		AddToFieldOnCanvas(
			Antibody,50*dt,pos.x,pos.y);
	}

}

function BCellRandChangeDir(dt)
{
	for(i=0;i<BCellAmt;i++)
	{
		// 新的位置 = 旧的位置+速度*dt
		var vel = BCellVel[i];

		var vDir = atan2(vel.y,vel.x);
		var vMag = vel.mag();

		vDir += random(-3,3)*dt;
		var vx = vMag * cos(vDir);
		var vy = vMag * sin(vDir);
		vel.x = vx;
		vel.y = vy;
		BCellVel[i] = vel;
	}
}

function BCellMove(dt)
{
	for(i=0;i<BCellAmt;i++)
	{
		// 新的位置 = 旧的位置+速度*dt
		var vel = BCellVel[i];
		var movement = vel.copy();
		movement = movement.mult(dt);

		var posNow = BCellPos[i];
		var PosNext = posNow.copy();
		PosNext = PosNext.add(movement);

		// 如果移到了画布外，则翻转速度方向
		
		if(PosNext.x>width )
		{
			PosNext.x = 0;
		}
		else if(PosNext.x<0)
		{
			PosNext.x = width;
		}
		if(PosNext.y>height )
		{
			PosNext.y = 0;
		}
		else if(PosNext.y<0)
		{
			PosNext.y = height;
		}
		

		BCellPos[i] = PosNext;
		//print("PosNext:" + PosNext);
	}
}






