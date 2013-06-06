var jsontree = require('./index')
  , assert = require('assert')
  , util = require('util')
;


module.exports = {
  'primitives': function() {
    assert.deepEqual(jsontree.toTree({}), {
      "label": {
        "type": "Object",
      },
      "children": []
    })

    assert.deepEqual(jsontree.toTree([]), {
      "label": {
        "type": "List",
      },
      "children": []
    })

    assert.deepEqual(jsontree.toTree("value"), {
      "label": {
        "type": "Value",
        "value": "value",
      }
    })

  },

  'simple object': function() {
    assert.deepEqual(jsontree.toTree({
      "key": "value"
    }), {
      "label": {
        "type": "Object",
      },
      "children": [
        {
          "label": {
            "type": "Value",
            "name": "key",
            "value": "value"
          }
        }
      ]
    });
  },

  'populated list': function() {

    assert.deepEqual(jsontree.toTree([
     "value1",
     {
        "key": "value"
     },
     "value3"
    ]), {
      "label": {
        "type": "List",
      },
      "children": [
        {
          "label": {
            "type": "Value",
            "value": "value1"
          }
        },
        {
          "label": {
            "type": "Object",
          },
          "children": [
            {
              "label": {
                "type": "Value",
                "name": "key",
                "value": "value"
              }
            }
          ]
        },
        {

          "label": {
            "type": "Value",
            "value": "value3"
          }
        }
      ]
    });

  },

  'populated object': function() {

    assert.deepEqual(jsontree.toTree({
     "key": "value",
     "list": [
       "one",
       "two"
     ],
     "object": {
       "woho": "works"
     }
    }), {
      "label": {
        "type": "Object",
      },
      "children": [
        {
          "label": {
            "type": "Value",
            "name": "key",
            "value": "value"
          }
        },
        {
          "label": {
            "type": "List",
            "name": "list",
          },
          "children": [
            {
              "label": {
                "type": "Value",
                "value": "one"
              }
            },
            {
              "label": {
                "type": "Value",
                "value": "two"
              }
            }
          ]
        },
        {
          "label": {
            "type": "Object",
            "name": "object",
          },
          "children": [
            {
              "label": {
                "type": "Value",
                "name": "woho",
                "value": "works"
              }
            }
          ]
        }
      ]
    });
  }
};
