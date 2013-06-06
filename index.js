var _ = require('underscore'),
    allong = require('allong.es').es
;

var sorter = allong.getWith('name');

// Takes a Javascript object and returns it as an OLT
var toTree = function(obj, name) {

  var node = {
    label: {}
  };

  if(name) node.label.name = name;

  if(_.isArray(obj)) {
    node.label.type = "List";
    node.children =_.map(obj, allong.unary(toTree)); 
  } else if(_.isObject(obj)) {
    node.label.type = "Object";
    node.children =_.map(obj, toTree).sort(sorter); 
  } else {
    node.label.type = "Value";
    node.label.value = obj;
  }

  return node;
};

var toObject = function(tree) {
  throw new Error('not implemented');
};

module.exports = {
  toTree: toTree,
  toObject: toObject
};
