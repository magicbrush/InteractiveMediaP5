var x = 200;
var y = 200;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(640,480);
}


var timeToHappen = 1;
var lastTime = 0.0;
// 函数draw()：作画阶段
function draw() {
	background(255);

	var tNow = millis()/1000;
	var deltaTime = tNow - lastTime;

	timeToHappen -= deltaTime;
	var shouldHappen = (timeToHappen<=0);
	if(shouldHappen)
	{
		happen();
		timeToHappen = random(0.5,2);
	}


	ellipse(x,y,10,10);
	lastTime = tNow;
}


function happen()
{
	x += random(-5,5);
	y += random(-3,3);
}