
var pos = new Vector(200,150,0);

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,300);

}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色

	var mousePos = new Vector(mouseX,mouseY,0);
	var offset = mousePos.subtract(pos);
	var movement = offset.unit().multiply(20.0);

	pos = pos.add(movement);
	
	
//ellipse(100,100,50,50);


	ellipse(pos.x,pos.y,50,50); // 画圆形
}