var Agents;// 鸟群

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);

	Agents = new Array();
	for(var i=0;i<100;i++)
	{
		// 制定随机的位置和速度，生成一只鸟
		pos = createVector(random(0,width),random(0,height));
		vel = createVector(random(-5,5),random(-5,5));
		Agents[i] = new agent(pos,vel);
	}
}

// 函数draw()：作画阶段
function draw() {
	fill(255,15);// 填充白色
	rect(-5,-5,width+10,height+10);
	
	// 更新每个鸟
	for(var i=0;i<Agents.length;i++)
	{
		Agents[i].update(1);
	}

	// 画出来所有的鸟
	for(var i=0;i<Agents.length;i++)
	{
		Agents[i].draw();
	}
}