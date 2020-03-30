
function initValueEllipse2_3(x,y) {
	val = 1/(2*x*x + 3*y*y);
	val = constrain(val,0,1);
	return val;
}

function initValueEllipse(x,y,ax,ay) {
	val = 1/(ax*x*x + ay*y*y);
	val = constrain(val,0,1);
	return val;
}

function initValueSinXPlusCosY(x,y) {
	val = sin(x) + cos(y);
	val = map(val,-2,2,0,1);
	return val;
}

function initValueSinXxCosY(x,y) {
	val = sin(x) * cos(y);
	val = map(val,-1,1,0,1);
	return val;
}

function initValueSinRCosTheta(x,y) {
	var r = sqrt(x*x + y*y);
	var theta = atan2(y,x);
	var val = sin(r) * cos(theta);
	return val;
}