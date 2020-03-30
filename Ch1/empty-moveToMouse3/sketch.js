// 位置
//var x = 200;
//var y = 150;
var pos = new Vector(200,150,0);

// 速度
//var spdX = 0;
//var spdY = 0;
var velocity = new Vector(0,0,0);

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,300);

}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色


	// dx, dy: 偏移量
	// 求法： 偏移量=鼠标位置-位置
	//var dx = mouseX-x;
	//var dy = mouseY-y;
	var mousePos = new Vector(mouseX,mouseY);
	var deltaPos = mousePos.subtract(pos);

	// distance: 偏移量的长度
	//var distance = sqrt(dx*dx + dy*dy);
	var distance = deltaPos.length();
	var movement = 
		deltaPos.multiply(10).divide(distance);

	// 位置发生变化
	//x += 0.1*dx ;
	//y += 0.1*dy ;
	pos = pos.add(movement);
	

/*
	var secs = millis()/1000.0;

	spdX = 5*(2*noise(0.993*secs)-1);
	spdY = 5*(2*noise(1.034*secs+100)-1);
	x += spdX;
	y += spdY;
	*/

	ellipse(pos.x,pos.y,50,50); // 画圆形


}