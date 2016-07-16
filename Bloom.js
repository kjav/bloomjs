function Bloom(n, p) {
  var m = -(n*Math.log(p)) / Math.pow(Math.log(2), 2);
  var logm = Math.ceil(Math.log2(m));
  m = 1<<logm;
  var k = m/n * Math.log(2);

  this.buffer = new ArrayBuffer(m);
  this.view = new Uint8Array(this.buffer);

  this.set = function(i) {
    if (!this.get(i))
      this.view[i>>3] += 1<<(i%8);
  };


  this.get = function(i) {
    return (this.view[i>>3]>>(i%8))%2;
  };

  this.salts = [];
  for (var i=0;i<k;i++) {
    this.salts[i] = sha256(i.toString());
  }

  this.bin = function(s) {
    s = sha256(s);
    var pre = s.substr(0, Math.ceil(logm/4));
    return parseInt(pre, 16) % m;
  };

  this.add = function(s) {
    for (var i=0;i<k;i++) {
      this.set(this.bin(this.salts[i] + s));
    }
  };

  this.contains = function(s) {
    var flag = 1;
    for (var i=0;i<k;i++) {
      flag &= this.get(this.bin(this.salts[i] + s));
    }
    return Boolean(flag);
  };
}
