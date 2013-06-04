var _ = require('underscore');

/*
 * Format of OLT (Ordered Labeled Tree):
 *
 *  [
 *    {
 *      "name": "child-node",
 *      "children": [
 *        ...
 *      ]
 *    },
 *    ...
 *  ]
 *
 */

/*
 * IDEA
 *
 * Skip the key names in the output from esprima, and instead expect
 * there to be a number of types in a certain order, in each type of
 * node in the AST. Determine this based on the node's label.
 *
 * A convenient place to get these from is the esprima source.
 *
 * ALL nodes have a type attribute.
 *
 * $ node render-ast.js others/esprima/esprima.js|grep '"type"' | awk '{print $2}' | sed -e 's/\(",\)//g' | sed -e 's/"//g' | sort | uniq -c > present.tx
 * # tmpd.js contains the SyntaxTreeDelegate from esprima.js
 * $ cat tmpd.js| grep function | awk '{print $1}' | sed -e 's/://g' | sed -e 's/create//g' | sort | uniq > in-esprima.txt
 * $ cat present.txt| grep -f in-esprima.txt 
 *  LogicalExpression
 *  UpdateExpression
 *
 */

// Takes a Javascript object and returns it as an OLT
var fromObject = function(obj) {
  var children;

  if(!_.isObject(obj)) {
    // This is a discrepancy, call it X
    children = [{
      "name": obj, "children": []
    }];
  } else if(_.isArray(obj)) {
    children = obj.map(fromObject);
  } else {
    var keys = _.keys(obj).sort(),
        nKeys = keys.length,
        val, key;
    children = new Array(nKeys);

    for(var i = 0; i < nKeys; i++) {
      key = keys[i];
      val = obj[key];

      children[i] = {
        "name"     : key,
        "children" : fromObject(val)
      };
    }
  }
  return children;
};

// Inverse of fromObject: takes an OLT and returns the original object
var toObject = function(olt) {

  // This is _dual_ of the discrepancy X in fromObject()
  if(olt.length === 1 && olt[0].children.length === 0) {
    return olt[0].name;
  }

  var obj = {}, length = olt.length, node, name;
  for(var i = 0; i < length; i++) {
    node = olt[i];
    obj[node.name] = toObject(node.children);
  }

  return obj;
};

module.exports = {
  fromObject: fromObject,
  toObject: toObject
};
