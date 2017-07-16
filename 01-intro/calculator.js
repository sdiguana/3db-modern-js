console.log("from calc");
//module.exports = function (left, right) { return left+right; }
//module.exports.add = function (left, right) { return left+right; };
//module.exports.sub = function (left, right) { return left-right; };

module.exports = {
  add: function (left, right) {return left+right;  },
    sub: function (left,right) {return left-right}
};

//note exports is an alias for module.exports
exports.mul = mul;

function mul(left,right) {
    return left*right;
}