

function handle(p,r,cr)
{
    this.position = p;
    this.radius = r;
    this.color = cr;
    this.pointerIn = false;
    this.dragging = false;
    this.startDragPos = createVector(0,0);
    this.startDragPtrPos = createVector(0,0);
    
    this.draw = function()
    {
        push();
        strokeWeight(1);
        
        if(this.pointerIn){
            if(this.dragging){
                fill(255,50);
                stroke(0);
            }
            else{
                fill(this.color);
                stroke(this.color);                   
            }            
        }
        else{
            fill(this.color);
            noStroke();
        }        
        
        circle(this.position.x,this.position.y,2*this.radius);
        pop();
    }
    
    this.inside = function(x,y)
    {
        let p = createVector(x,y);
        let offset = p5.Vector.sub(p,this.position);
        let dist = offset.mag();
        if(dist<this.radius){
            return true;
        }
        else{
            return false;
        }    
    }
    
    this.pointerMove = function(x,y)
    {
        let flag = this.inside(x,y);
        this.pointerIn = flag;
        
        if(this.dragging){
            let mposNow = createVector(x,y);
            let dragOffset = p5.Vector.sub(mposNow,this.startDragPtrPos);
            let pos = p5.Vector.add(this.startDragPos, dragOffset);
            this.position = pos;
        }
        
    }
    
    this.pointerDown = function(x,y)
    {
        if(this.pointerIn){
            this.dragging = true;
            this.startDragPos = this.position;
            this.startDragPtrPos = createVector(x,y);
        }
    }
    
    this.pointerUp = function(x,y)
    {
        this.dragging = false;
    }
    
}

function ruler(posA,posB,cr)
{
    this.handleA = new handle(posA,9,cr);
    this.handleB = new handle(posB,6,cr);
    this.projPos = new Array();
    this.projDProd = new Array();
    this.varSum = 0;
    
    this.drawProjPos = function() {
        push();
        for(var i=0;i<this.projPos.length;i++){
            fill(this.handleA.color);
            noStroke();
            var pi = this.projPos[i];
            circle(pi.x,pi.y,2);
        }
        pop();
    }

    this.draw = function()
    {
        this.handleA.draw();
        this.handleB.draw();
        
        let dir01 = this.rulerDir();
        let p0 = this.handleA.position;
        let p1 = this.handleB.position;
        
        push();       
        stroke(this.handleA.color);
        line(p0.x,p0.y,p0.x + 1000*dir01.x, p0.y + 1000*dir01.y);
        line(p0.x,p0.y,p0.x - 1000*dir01.x, p0.y - 1000*dir01.y);
        pop();
        
       // this.drawProjPos();        
    }
    
    this.rulerDir = function()
    {
        let p0 = this.handleA.position;
        let p1 = this.handleB.position;
        let p01 = p5.Vector.sub(p1,p0);
        let dir01 = p01.normalize();
        return dir01;
    }
    
    this.pointerMove = function(x,y)
    {
        this.handleA.pointerMove(x,y);
        this.handleB.pointerMove(x,y);
    }
    
    this.pointerDown = function(x,y)
    {
        this.handleA.pointerDown(x,y);
        this.handleB.pointerDown(x,y);
    }
    
    this.pointerUp = function(x,y)
    {
        this.handleA.pointerUp(x,y);
        this.handleB.pointerUp(x,y);
    }
    
    this.measure = function(positions)
    {
        this.projDProd = new Array(positions.length);
        var sum = 0;
        for(var i=0;i<positions.length;i++){
            var p = positions[i];
            var dp = this.getProjDProd(p);  
            this.projDProd[i] = dp;
            sum += dp;
        }
        var avg = sum/this.projDProd.length;
        
        for(var i=0;i<this.projDProd.length;i++){
            this.projDProd[i] = this.projDProd[i]-avg;
        }
        
        this.varSum = 0;
        for(var i=0;i<this.projDProd.length;i++){
            this.varSum += this.projDProd[i];
        }
                
        return this.projDProd;
    }
    
    this.computeVar3 = function(poss){        
        var csqSum = 0;
        var asqSum = 0;
        var bsqSum = 0;
        var fact = 0.00001;
        for(var i=0;i<poss.length;i++){
            var p = poss[i];
            var q = this.getProjPos(p);
            var o = this.handleA.position;
            var op = p5.Vector.sub(p,o);
            var oq = p5.Vector.sub(q,o);
            var pq = p5.Vector.sub(q,p);
            var csq = op.magSq();
            var asq = oq.magSq();
            var bsq = pq.magSq();
            csqSum += csq*fact;
            asqSum += asq*fact;
            bsqSum += bsq*fact;            
        }
        var ar = asqSum;
        var br = bsqSum;
        var cr = csqSum;
        var ab = createVector(ar,br,cr);
        return ab;        
    }
    
   
    
    this.printState = function()
    {
        print(this.varSum);
    }
    
    this.getProjPos = function(srcPos)
    {        
        var p0 = this.handleA.position;
        var dir = this.rulerDir();
        let p2sp = p5.Vector.sub(srcPos,p0);
        //p2sp.normalize();
        let dProd = p5.Vector.dot(p2sp,dir);
        let projVec = dir.copy();
        projVec.setMag(dProd);
        let projPos = p5.Vector.add(p0,projVec);
        return projPos;        
    }
    
    this.getProjDProd = function(srcPos)
    {
        var p0 = this.handleA.position;
        var dir = this.rulerDir();
        let p2sp = p5.Vector.sub(srcPos,p0);
        let dProd = p5.Vector.dot(p2sp,dir);
        return dProd;
    }
    
    this.drawProjLine = function(srcPos,cr)
    {
        let projPos = this.getProjPos(srcPos);
        var p0 = this.handleA.position;
        var pp = p5.Vector.sub(srcPos,projPos);
        var d = pp.mag();
        let a = lerp(255,0,2*d/width);
        var crLine = color(cr);
        crLine.setAlpha(a);
        push();
        strokeWeight(0.5);
        stroke(crLine);
        line(srcPos.x,srcPos.y,projPos.x,projPos.y);
        
        cr.setAlpha(a);
        fill(cr);
        noStroke();
        let dotSize = lerp(4,0,d/width);
        circle(projPos.x,projPos.y,dotSize);
        pop();
    }
    
    this.drawProjLines = function(srcs,cr)
    {
        for(var i=0;i<srcs.length;i++){
            this.drawProjLine(srcs[i],cr);
        }
            
    }
    
    this.setColor = function(cr)
    {
        this.handleA.color = cr;
        this.handleB.color = cr;
    }
    this.getColor = function()
    {
        let cr = color(0,0,0,0);
        cr.setRed(red(this.handleA.color));
        cr.setGreen(green(this.handleA.color));
        cr.setBlue(blue(this.handleA.color));
        cr.setAlpha(red(this.handleA.color));        
        return cr;
    }
    
}


