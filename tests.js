var assert = require('chai').assert
  , _ = require('underscore')
  ,  astdiff = require('./index')
  , fs = require('fs')
  , esprima = require('esprima')
  , prettyjson = require('prettyjson')
  , assert = require('assert')
  , util = require('util')
;


var readAST = function(path) {
  var code = fs.readFileSync(path);
  return esprima.parse(code);
};

{
  "name": "...",
  "value": "...",
  "children": [

  ]
}

module.exports = {
  'Transformations between AST and OLT': {
    'fromObject, simple object': function() {


      _.each({

        "simple value": {
          "object": {
            "key": "value"
          },
          "olt": {
            "name": "key",
            "value": "value"
          }
        }

        "empty-array": {
          "object": {
            "key": []
          },
          "olt": {
            "name": "key",
            "children": []
          }
        }

        "empty-object": {
          "object": {
            "key": {}
          },
          "olt": {
            "name": "key",
            "children": []
          }
        }

        "filled-array": {
          "object": {
            "key": [
              "value"
            ]
          },
          "olt": {

          }
        }

        "filled-object": {
          "object": {
            "first": {
              "second": "value"
            }
          }
          "olt": {

          }
        }

      }, function(obj, name) {
        var olt = astdiff.fromObject(obj);
        console.log(JSON.stringify(olt, null, 2));


        //var _obj = astdiff.toObject(olt);
        //assert.deepEqual(obj, _obj, util.format('\n\n%s should be equal to\n\n%s\n\nbut is \n\n %sname\n\n',
          //name, JSON.stringify(obj, null, 2), JSON.stringify(_obj, null, 2)
        //));

      });

    }

  }
};
