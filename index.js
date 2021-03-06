var Transform = require('readable-stream/transform');
var inherits =  require('inherits');
var deepEqual = require('deep-equal');

var objMode = {objectMode:1};

inherits(Uniq, Transform);

Uniq.prototype._transform = function(chunk, enc, cb){
  if(!this.lastItem){
    this.lastItem = chunk;
    this.push(chunk);
    return cb();
  }

  var matched = this.matcher(this.lastItem, chunk)
  if(!matched) this.lastItem = chunk;
  cb();
}

Uniq.prototype._flush = function(cb){
  this.lastItem = null;
}

function Uniq(matcher, obj){
  if(!(this instanceof Uniq)) return new Uniq(matcher, obj); 
  if(!matcher) matcher = deepEqual;
  if(!obj) obj = objMode;

  this.matcher = matcher;
  this.lastItem = null;

  Transform.call(this, obj);
}

module.exports = Uniq;
