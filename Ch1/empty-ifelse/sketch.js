// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,300);
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	ellipse(100,100,200,200); // 画圆形

	var condition1 = true;
	var condition2 = true;
	var condition3 = true;
	// case 1
	if (condition1){
		// A
	}
	else{
		// B
	}

	// case 2
	if(condition1){
		// A
	}
	// B

	// case 3
	if(condition1){
		// A
	}
	else if(condition2){
		// B
	}

	// case 4
	if(condition1){
		// A
	}
	if(condition2){
		// B
	}


	if(condition1)
	{
		//A
	}
	else if(condition2)
	{
		//B
	}
	else if(condition3)
	{
		//C
	}
	else
	{
		//D
	}

	var condition4 = true;
	if(condition4)
	{
		//E
	}

	// case 5
	if(flag){
		hero.pickFlag();
	}
	else if(enemy){
		hero.attack(enemy);
	}
	
	// case6
	if(flag){
		hero.pickFlag();
	}
	if(enemy){
		hero.attack(enemy);
	}



}