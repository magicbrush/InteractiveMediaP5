

function drawBox0(pos,id,scl)
{
    rectMode(CENTER);
    textAlign(LEFT);
    push();
    fill(0,50);
    noStroke();
    translate(width/4,height/2);
    scale(scl,scl);
    square(pos.x,pos.y,0.14,0.03);
    fill(0);
    circle(pos.x,pos.y,0.02)
    
    
    fill(0,70);
    textSize(0.05);
    text(id, pos.x-0.01, pos.y+0.06);
    
    pop();
}

function drawBox(pos,id,scl)
{
    rectMode(CENTER);
    textAlign(LEFT);
    push();
    fill(0,50);
    noStroke();    
    //scale(scl,scl);
    square(pos.x,pos.y,scl,scl*0.1);
    fill(0);
    circle(pos.x,pos.y,2)    

    fill(0,70);
    textSize(scl*0.4);
    text(id, pos.x-scl*0.4, pos.y+scl*0.4);
    
    pop();
}


function boxPos2Screen2(pos)
{
    let bpScl = 200;
    let bpBiasX = width/4;
    let bpBiasY = height/2;
    
    
    let pos2 = pos.copy();
    pos2.x = pos2.x * bpScl;
    pos2.y = pos2.y * bpScl;
    
    let posT =  p5.Vector.add(
        pos2,createVector(bpBiasX,bpBiasY));
    //let posTS = posT.mult(bpScl);
    return posT;    
}

function boxPos2Screen(pos,ctr,scl)
{
    let bpScl = scl;
    let bpBiasX = ctr.x
    let bpBiasY = ctr.y;    
    
    let pos2 = pos.copy();
    pos2.x = pos2.x * bpScl;
    pos2.y = pos2.y * bpScl;
    
    let posT =  p5.Vector.add(
        pos2,createVector(bpBiasX,bpBiasY));
    //let posTS = posT.mult(bpScl);
    return posT;    
}

function ij2pos(i,j,ctr,scl)
{
    let a = 1/7;
    let b =-3.5/7;
    let c = 1/7;
    let d = -3.5/7;
    
    let y = a*i+b;
    let x = c*j+d;
    
    let p = createVector(x,y);
    let pscn = boxPos2Screen(p,ctr,scl);
    return pscn;
}

function createAWEarray()
{
    let A = new Array(8);
    for(i=0;i<A.length;i++)
    {
        A[i] = new Array(8);
        for(j=0;j<A[i].length;j++)
        {
            A[i][j] = 0; 
        }
    }
    A[0][2] = 1;
    A[0][3] = 1;
    A[0][4] = 1;
    A[0][5] = 1;
    A[0][6] = 1;
    
    A[1][2] = 1;
    A[1][4] = 1;
    A[1][6] = 1;
   
    A[2][2] = 1;
    A[2][3] = 1;
    A[2][4] = 1;
    A[2][5] = 1;
    A[2][6] = 1;
    
    A[3][2] = 1;
    A[3][4] = 1;
    A[3][6] = 1;
    
    A[4][1] = 1;
    A[4][2] = 1;
    A[4][3] = 1;
    A[4][4] = 1;
    A[4][5] = 1;
    A[4][6] = 1;
    A[4][7] = 1;
    
    A[5][2] = 1;
    A[5][3] = 1;
    A[5][4] = 1;
    A[5][6] = 6;
    
    A[6][2] = 1;
    A[6][4] = 1;
    A[6][5] = 1;
    
    A[7][2] = 1;
    A[7][3] = 1;
    A[7][5] = 1;
    A[7][6] = 1;
    
    return A;
}


