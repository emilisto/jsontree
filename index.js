var _ = require('underscore'),
    allong = require('allong.es').es
;

var sorter = allong.getWith('name');

// Takes a Javascript object and returns it as an OLT
var toTree = function(obj, name) {

  var ret = {};
  if(name) ret.name = name;

  if(_.isArray(obj)) {
    _.extend(ret, {
      "type": "List",
      "children": _.map(obj, allong.unary(toTree))
    });
  } else if(_.isObject(obj)) {
    _.extend(ret, {
      "type": "Object",
      "children": _.map(obj, toTree).sort(sorter)
    });
  } else {
    _.extend(ret, {
      "type": "Value",
      "value": obj
    });
  }

  return ret;
};

var toObject = function(tree) {
  throw new Error('not implemented');
};

module.exports = {
  toTree: toTree,
  toObject: toObject
};
