var Traces;
function setup() {
  // put setup code here
  createCanvas(400,500);
  //line_rand_0011(50,150,350,150,5,100);
  Traces = new Array();
}

function draw() {
	fill(255,100);
	rect(-1,-1,width+2,height+2);
  
  	// 线条轨迹变化
  	Traces[0] = lineAry_rand_0011(
		50,50,350,50,0.1*mouseY,100);
	Traces[1] = lineAry_roll_0011(
		50,100,350,100,0.1*mouseY,mouseX,300);
	Traces[2]= lineAry_noise_0011(
		50,150,350,150,0.1*mouseY,0.1*mouseX,200);
	
	// 将轨迹渲染出来
	for(var i=0;i<3;i++)
	{
		// 渲染方式1:简单线条
		renderTrace_Line(Traces[i]);
		// 渲染方式2:一组脸
		renderTrace2_Sprites(
			Traces[i],0.025,drawStdFace,0.2);
		// 渲染方式3:一个移动sprite
		//renderTrace2_MovingSprite(
		//	Traces[i],1,0.5,drawStdFace,0.2);
		// 渲染方式4:一组移动的sprite
		//renderTrace3_MovingSprites(
		//	Traces[i],0.1,0.5,0.05,drawStdFace,0.1);
	}
	
}

