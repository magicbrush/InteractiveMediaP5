var col;//控制颜色
var freq = 0.000002; //步长
var r;//半径

function setup() {
  createCanvas(600, 600);	
}

function draw() 
{
    background(25*noise(millis()/2000));    //会呼吸的宇宙背景          
    translate(300, 300);  
    rotate(millis()/2000);//随时间旋转
    ellipseMode(RADIUS); //以半径模式画圆
    drawstar(millis()/30000);
}

function drawstar(rate)
{
    
  for (var i=0; i<400; i ++) {  // 粒子总数
    cir= 200 + 175*sin(millis()*freq*i);    //粒子基础位置
    col=map(cir,25,375,175,0);  //颜色映射
    r=map(cir,25,375,5*noise(i),15*noise(i));  //圆半径的计算，由远及近变大
    fill(col,col,255*noise(millis()/1000));//紫红为主色调
    noStroke();
    ellipse(cir*cos(i), cir*sin(rate*i),r,r);  //周期核心
          
 }	
}