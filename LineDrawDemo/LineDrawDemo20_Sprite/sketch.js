function setup() {
  // put setup code here
  createCanvas(400,500);
  //line_rand_0011(50,150,350,150,5,100);

}

function draw() {
	fill(255);
	rect(-1,-1,width+2,height+2);
  
  	// put drawing code here
  	var randNess = constrain(0.001*mouseX*mouseY,0,40);
	line_rand_0011(
		50,50,350,50,randNess,100);
	line_roll_0011(
		50,100,350,100,0.1*mouseY,mouseX,300);
	line_noise_0011(
		50,150,350,150,0.1*mouseY,0.1*mouseX,200);
	line_randWid_0011(
		50,200,350,200,0.1,0.05*mouseY,100);
	line_SinWid_0011(
		50,250,350,250,0.1,0.1*mouseY,0.1*mouseX,0.03*mouseX,200);
	line_noiseWid_0011(
		50,300,350,300,1,0.1*mouseY,0.1*mouseX,0.05*mouseX,200);

	var spriteFcn = drawStdCircle;
	if(mouseX<width/2)
	{
		spriteFcn = drawStdFace;
	}
	line_randWidSprite_0011(
		50,350,350,350,0.001,0.002*mouseY,50,spriteFcn);
	line_SinWidSprite_0011(
		50,400,350,400,0.1,0.8*mouseY/height,0.1*mouseX,0.03*mouseX,20,spriteFcn);

}


