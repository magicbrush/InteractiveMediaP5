// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	
	var secs = millis()/1000; // 秒数

	if(secs>10)
	{
		return;
	}
	var centerX = 250;
	var centerY = 250;
	var angleStep = PI/16;
	var mmm = 1;
	for(var i=0;
		i<TWO_PI/angleStep;
		i++)
	{
		var amplitude = 20 * sin(5*i) + 100;
		var offsetX = 
			amplitude*sin(3*(i+secs)*angleStep);
		var offsetY = 
			amplitude*cos(3*(i+secs)*angleStep);

		var x = centerX + offsetX;
		var y = centerY + offsetY;

		var sizeX = 10*sin(10*(i+2*secs)) + 30;
		var sizeY = 15*cos(8*(i+1.5*secs)) + 26;
		ellipse(x,y,sizeX,sizeY*mmm);
		mmm *= 1.01;
		
	}
}