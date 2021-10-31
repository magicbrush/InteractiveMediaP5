
let boxes = new Array();
let h = null;
let r = null;


// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
    let Ary = createAWEarray();
    let ctr = createVector(width/4,height/2);
    let scl = 200;
    for(i=0;i<Ary.length;i++){
        for(j=0;j<Ary[i].length;j++){
            if(Ary[i][j]>0)
            {
                boxes[boxes.length] = ij2pos(i,j,ctr,scl);
                /*
                if(i==0){
                    print(boxes[0]);
                }*/
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
    
    var boxSize = width/40;
    var ZAryAkr = createVector(width-boxSize*4,boxSize*2);
    
    var ZAryIStep = createVector(boxSize,0);
    var ZAryJStep = createVector(0,boxSize);
    DispMeasureZValues(
        ZAryAkr,ZAryIStep,ZAryJStep,boxSize);
    
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
    
    updateMeasureZValues();
    //DispMeasureZValues();
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

var DProds = new Array();
var MsrZVals = new Array();
function updateMeasureZValues()
{
    var DPs = new Array();
    var sum = 0.0;
    for(var i=0;i<r.length;i++){
        for(var j=0;j<r[i].projDProd.length;j++){
            var dotProdVal = r[i].projDProd[j];
            sum += dotProdVal;
            DPs.push(dotProdVal);
        }
    }
    if(DPs.length==0){
        return;
    }
    var average = sum/DPs.length;
    var varSum = 0;
    for(var i=0;i<DPs.length;i++){
        var dp = DPs[i];
        var bias = dp-average;
        var biasSqr = bias*bias;
        varSum += biasSqr;        
    }
    var varAvg = varSum/DPs.length;
    var std = sqrt(varAvg);
    
    MsrZVals = new Array();
    for(var i=0;i<r.length;i++){
        var DPZi =  Convert2Z(r[i].projDProd,average,std);
        MsrZVals.push(DPZi);
    }
   // print(MsrZVals);
}

function Convert2Z(vals,avg,std)
{
    var z = new Array(vals.length);
    for(var i=0;i<vals.length;i++){
        z[i] = (vals[i]-avg)/std;
    }
    return z;
}

function DispMeasureZValues(Origin,IStep,JStep,BoxSize)
{
    stroke(0);
    strokeWeight(1);
    for(var i=0;i<MsrZVals.length;i++){
        for(var j=0;j<MsrZVals[i].length;j++){
            var z = MsrZVals[i][j];
            
            var IBias = IStep.copy();
            IBias.mult(i);
            var JBias = JStep.copy();
            JBias.mult(j);
            var pos = p5.Vector.add(Origin,IBias);
            pos = p5.Vector.add(pos,JBias);
            
            var alpha = lerp(0,255,abs(z)/3);
            var crA = color(255,255,255,alpha);
            var crB = color(0,0,0,alpha);
            if(z>0){
                fill(crA);
            }else{
                fill(crB);
            }
            square(pos.x,pos.y,BoxSize); 
        }
    }
}

