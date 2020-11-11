function setup() {
  // put setup code here
  createCanvas(400,500);
  //line_rand_0011(50,150,350,150,5,100);

}

function draw() {
	fill(255);
	rect(-1,-1,width+2,height+2);
  
  	// 线条轨迹变化
  	drawLine_TraceVary();

	// 线宽变化
	drawLine_WidthVary();

	// 沿线条贴图组
	drawLine_Sprie();
	
	// 沿线条运动的小球
	drawLine_MoveSprite();

}


function drawLine_TraceVary()
{
	var randNess = constrain(0.001*mouseX*mouseY,0,40);
	line_rand_0011(
		50,50,350,50,randNess,100);
	line_roll_0011(
		50,100,350,100,0.1*mouseY,mouseX,300);
	line_noise_0011(
		50,150,350,150,0.1*mouseY,0.1*mouseX,200);
}

function drawLine_WidthVary()
{
	line_randWid_0011(
		50,200,350,200,0.1,0.05*mouseY,100);
	line_SinWid_0011(
		50,250,350,250,0.1,0.1*mouseY,0.1*mouseX,0.03*mouseX,200);
	line_noiseWid_0011(
		50,300,350,300,1,0.1*mouseY,0.1*mouseX,0.05*mouseX,200);
}

function drawLine_Sprie()
{
	var SpriteFcn = drawStdCircle;
	if(mouseX<width/2)
	{
		SpriteFcn = drawStdFace;
	}

	line_randWidSprite_0011(
		50,350,350,350,
		0.001,0.002*mouseY,50,SpriteFcn);
	line_SinWidSprite_0011(
		50,400,350,400,
		0.1,0.8*mouseY/height,0.1*mouseX,0.03*mouseX,20,SpriteFcn);
}

function drawLine_MoveSprite()
{
	for(var T0=0;T0<1;T0+=0.2)
	{
		line_rollMoveSprite_0011(
			50,100,350,100,
			0.1*mouseY,mouseX,300,
			drawStdFace,0.4,0.5,T0);
	
		line_noiseMoveSprite_0011(
			50,150,350,150,
			0.1*mouseY,0.1*mouseX,200,
			drawStdFace,0.4,0.5,T0);
	}
}

