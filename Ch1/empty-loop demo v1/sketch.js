// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	var secs = millis()/1000;

	var centerX = 250;
	var centerY = 250;
	var radius = 150;
	var circleCount = 30;

	var mm =1;
	for(var i=0;i<circleCount;i++)
	{
		var radius2 = 
			mm*radius + 12*sin((i+1.234*secs)*15);
		var offsetX = 
			radius2 * sin((i+5*secs) * TWO_PI/circleCount);
		var offsetY = 
			radius2 * cos((i+5*secs) * TWO_PI/circleCount);
		var x = centerX + offsetX;
		var y = centerY + offsetY;

		var sizeX = 10*sin((i+secs)*10) + 30;
		var sizeY = 5*cos((i+secs)*8) + 35;

		ellipse(x,y,sizeX,sizeY);

		mm *= 1.01;
	}

	
}

function fx(i)
{
	return i*50;
}

function fy(i)
{
	return i*40;
}

