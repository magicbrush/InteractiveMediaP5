var B;
var E;
var DE;
var w = 200;
var h = 200;
var a = 0.02;
var b = 0.02;

var dt = 0.05;
var k = 1;
var tNow = 0;


var Agents;// 鸟群

// 函数setup() ：准备阶段
function setup() {
	createCanvas(w,h);

	// Init B and E
	B = CreateValueArray(w,h);
	B = InitValueArray_SinThetaSinRadius(B,a,b,0.15,3);
	E = CreateVector2Array(w,h);
	//E = InitVec2Array_RTheta(E,0.1,0.1,0.15,3);
	DE = CreateVector2Array(w,h);

	Agents = new Array();
	for(var i=0;i<100;i++)
	{
		// 制定随机的位置和速度，生成一只鸟
		var pos = createVector(random(0,width),random(0,height));
		var vel = createVector(random(0,0),random(0,0));
		var q = random(0,1)>0.5?random(-1,-0.5):random(0.5,1);
		Agents[i] = new agent(pos,vel,q);
	}
	

	tNow = GetTimeNow();
}

// 函数draw()：作画阶段
function draw() {
	fill(255,30);// 填充白色
	rect(-1,-1,width+2,height+2);	

	DE = CalDEbyB(B,DE,k);
	B = StepB2(B);
	E = StepE(E,DE,dt);

	agentUpdateDraw();

	var res = 20;
	drawValueArray(B,res,0.5,0.15);
	drawVec2Array(E,res,0.0,1.5,color(0,0,0,125));	

	
}

function agentUpdateDraw()
{
	// 更新每个鸟
	for(var i=0;i<Agents.length;i++)
	{
		Agents[i].seek3(createVector(mouseX,mouseY),5);
		Agents[i].addE(E,1);
		Agents[i].addB(B,1);
		Agents[i].update(1);
		for(var j=0;j<Agents.length;j++)
		{
			if(i==j)
			{
				continue;
			}
			Agents[i].avoid(Agents[j],0.01);
			Agents[i].align(Agents[j],0.03);
			//Agents[i].orbit(Agents[j],0.05);
		}
	}

	// 画出来所有的鸟
	for(var i=0;i<Agents.length;i++)
	{
		Agents[i].draw();
	}
}


