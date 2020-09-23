let tbl;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,300);

	//testNewTable();

	testLoadTable();

}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	ellipse(100,100,200,200); // 画圆形

}

function testLoadTable()
{
	table = loadTable('testTable.csv', 'csv', 'header');
}

function testNewTable()
{
	tbl = new p5.Table();
	tbl.addColumn("Name");
	tbl.addColumn("Age");

	let newR = tbl.addRow();
	newR.setString("Name","haha");
	newR.setNum("Age",random());
	let newR2 = tbl.addRow();
	newR2.setString("Name","Amy");
	newR2.setNum("Age",100*random());

	saveTable(tbl,"haha.csv");
}