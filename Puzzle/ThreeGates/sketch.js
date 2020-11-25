
var GameState = {
	"Prize": 0,
	"Choose1":0,
	"Hint":0,
	"Choose2":0
}
var stage = 0;
var winCount = 0;
var trialCount = 0;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,300);
	GameState = ininGameState(GameState);
}

// 函数draw()：作画阶段

function draw() {
	background(255);// 填充白色
	drawGame();
	autoPlayGame();
}

function drawGame()
{
	if(stage==0)
	{
		drawStage("choose 1,2 or 3 by pressing key");
	}
	else if(stage==1)
	{
		drawStage("The green is empty, you can choose again");
	}
	else if(stage ==2)
	{
		txt = "The Golden is the prize!";
		txt += " press any key ..."
		drawStage(txt);
		drawResultText();
	}
}

function drawStage(txt)
{
	var xctr = width/2;
	var yctr = height/2;
	var gap = width/4;
	var w = gap*0.8;
	textSize(20);
	text(txt,20,20);
	drawBox(xctr-gap,yctr,w,"1");
	drawBox(xctr,yctr,w,"2");
	drawBox(xctr+gap,yctr,w,"3");

	if(GameState.Choose2!=0)
	{
		var shift = (GameState.Choose2-2)*gap;
		var xCh1 = xctr + shift;
		drawChosen(xCh1,yctr,w-35);
	}
	else if(GameState.Choose1!=0)
	{
		var shift = (GameState.Choose1-2)*gap;
		var xCh1 = xctr + shift;
		drawChosen(xCh1,yctr,w-25);
	}

	if(GameState.Hint!=0)
	{
		var shift = (GameState.Hint-2)*gap;
		var xHint = xctr + shift;
		drawHint(xHint,yctr,w+5);
	}

	if(stage==2)
	{
		var shift = (GameState.Prize-2)*gap;
		var xPrize = xctr + shift;
		drawPrize(xPrize,yctr,w-45);
	}

	text("Win/Trial: " + winCount + "/" + trialCount,20,height-20);
}


function drawBox(x,y,w,txt)
{
	push();
	translate(x,y);
	stroke(1);
	noFill();
	rect(-w/2,-w/2,w,w);
	textSize(20);
	text(txt,-10,w);
	pop();
}

function drawChosen(x,y,w)
{
	push();
	translate(x,y);
	stroke(0);
	strokeWeight(2);
	noFill();
	ellipse(0,0,w,w)
	pop();
}

function drawHint(x,y,w)
{
	push();
	translate(x,y);
	strokeWeight(2);
	stroke(0,255,0);
	noFill();
	rect(-w/2,-w/2,w,w);
	textSize(20);
	text("empty",-30,-w*0.7);
	pop();
}

function drawPrize(x,y,w)
{
	push();
	translate(x,y);
	stroke(0);
	strokeWeight(1);
	fill(220,160,0);
	ellipse(0,0,w,w)
	pop();
}


function drawResultText()
{
	var Win = (GameState.Prize === GameState.Choose2);
	var resultTxt = Win?"Win!":"Lose";
	push();
	textAlign(CENTER);
	textSize(30);
	text(resultTxt,width/2,60);
	pop();

	
}

function keyPressed()
{
	playKey(key);
}

function playKey(key)
{
	print("key:" + key);
	if(stage==0)
	{
		choose1st(key);
		stage =1;
	}
	else if(stage==1)
	{
		choose2nd(key);
	}
	else if(stage ==2)
	{
		GameState = ininGameState(GameState);
		stage =0;
	}
}

function choose1st(k)
{
	if(key==="1")
	{
		GameState.Choose1 =1;
		hint(2,3);
	}
	else if(key==="2")
	{
		GameState.Choose1 =2;
		hint(1,3);
	}
	else if(key==="3")
	{
		GameState.Choose1 =3;
		hint(1,2);
	}
	stage = 1;
}

function hint(option2, option3)
{
	if(GameState.Prize==GameState.Choose1)
	{
		GameState.Hint = (random(0,1)>0.5)?option2:option3;
	}
	else
	{
		GameState.Hint = (GameState.Prize==option2)?option3:option2;
	}
}

function choose2nd(k)
{
	if(key==="1")
	{
		GameState.Choose2 =1;
	}
	else if(key==="2")
	{
		GameState.Choose2 =2;
		
	}
	else if(key==="3")
	{
		GameState.Choose2 =3;
	}
	countResult();
	stage = 2;
}

function countResult()
{
	if(GameState.Prize === GameState.Choose2)
	{
		winCount++;
	}
	trialCount ++;
}

function ininGameState(GState)
{
	GState.Prize = floor(random(1,4));
	GState.Choose1 = 0;
	GState.Hint = 0;
	GState.Choose2 = 0;
	print("Game Init");
	PrintGameState(GState);
	return GState;
}

function PrintGameState(GState)
{
	print(" 	Prize: "+ GState.Prize + 
		" Choose1: " + GState.Choose1 + 
		" Hint: " + GState.Hint +
		" Choose2: "+ GState.Choose2);
}



var leftTime = 0;
var lastTime = 0;
var timeStep = 0.8;
var autoPlay = true;
function autoPlayGame()
{
	var tNow = millis()/1000;
	var dt = tNow - lastTime;
	leftTime -= dt;
	if(leftTime<=0 && autoPlay)
	{
		// to be implemented
	}
	lastTime = tNow;
	print("to be implemented");
}


