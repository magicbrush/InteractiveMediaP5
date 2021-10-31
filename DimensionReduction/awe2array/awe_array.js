
let boxes = new Array();
let h = null;
let r = null;


// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,300);
    let Ary = createAWEarray();
    let ctr = createVector(width/4,height/2);
    let scl = 150;
    for(i=0;i<Ary.length;i++){
        for(j=0;j<Ary[i].length;j++){
            if(Ary[i][j]>0)
            {
                boxes[boxes.length] = ij2pos(i,j,ctr,scl);
                if(i==0){
                    print(boxes[0]);
                }
            }
        }        
    }        
    r = new Array();
    for(i=0;i<3;i++){
        r[i] = new ruler(createVector(random(20,width-20),random(20,height-20)),
                  createVector(random(20,width-20),random(20,height-20)),
                  color(255,0,0,100));
    }
    r[1].setColor(color(0,255,0,100));
    r[2].setColor(color(0,0,255,100));  
    
}

// 函数draw()：作画阶段
function draw() {
    background(255);
    //fill(255,255);
    //rect(-10,-10,width+20,height+20);
    
    
    
    
    //h.pointerMove(mouseX,mouseY);
    for(i=0;i<r.length;i++){
        //r[i].measure(boxes);
        r[i].draw();
        let cr = r[i].getColor();
        cr.setAlpha(0);
        r[i].drawProjLines(boxes,cr);
    }    
    
    for(i=0;i<boxes.length;i++){
        drawBox(boxes[i],i,20);
    }
    
    
    noFill();// 填充白色
    strokeWeight(1);
    stroke(0,100);
    rectMode(CORNER)
	rect(0,0,width,height);
    //fill(0);
    //text(50,20,20);
    
    
    
}


function mouseMoved()
{
    for(i=0;i<r.length;i++){
        r[i].pointerMove(mouseX,mouseY);
    }
    
}

function mousePressed()
{
    for(i=0;i<r.length;i++){
        r[i].pointerDown(mouseX,mouseY);
    }
    
}

function mouseDragged()
{
    for(i=0;i<r.length;i++){
        r[i].pointerMove(mouseX,mouseY);
        r[i].measure(boxes);
    }
    
}

function mouseReleased()
{
    for(i=0;i<r.length;i++){
        r[i].pointerUp(mouseX,mouseY);
    }
    
}

function mouseClicked()
{
    
}


