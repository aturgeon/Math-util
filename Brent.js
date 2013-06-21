

brentZeroes = function (a, b, f, delta) {
  if (!delta) delta = 0.001;
  var fa = f(a),
      fb = f(b);
  delta = Math.abs(delta);
  if (fa * fb >= 0) return;
  if (Math.abs(fa) < Math.abs(fb)) {
    var swap = a;
    a = b;
    b = swap; 
    fa = f(a);
    fb = f(b);
  }
  var c = a;
  var s = c;
  var fc = f(c),
      fs = f(s);
  var mflag = true;
  while(!(fb == 0 || fs == 0 || Math.abs(b - a) < delta)) {
    if (fa != fc && fb != fc) {
      s = a * fb * fc / ((fa - fb)*(fa - fc)) + b * fa * fc / ((fb - fa) * (fb - fc)) + c * fa * fb / ((fc - fa) * (fc - fb));
    }
    else {
      s = b - fb * (b - a) / (fb - fa);
    }
    if (!((s >= (3 * a + b)/4 && s <= b) || (s <= (3 * a + b)/4 && s >= b)) ||
	  (mflag && Math.abs(s - b) >= Math.abs(b - c)/2) ||
	  (!mflag && Math.abs(s - b) >= Math.abs(c - d) / 2) ||
	  (mflag && Math.abs(b - c) < delta)) {
      s = (a + b)/2;
      mflag = true;
    }
    else {
      mflag = false;
    }
    fs = f(s);
    var d = c, fd = fc;
    c = b;
    fc = fb;
    if (fa * fs < 0) {
      b = s;
      fb = fs;
    }
    else {
      a = s;
      fa = fs;
    }
    if (Math.abs(fa) < Math.abs(fb)) {
      var swap = a;
      a = b;
      b = swap; 
      fa = f(a);
      fb = f(b);
    }
  }
  console.log(s);
}