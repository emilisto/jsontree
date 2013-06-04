var assert = require('chai').assert
  , _ = require('underscore')
  ,  jsontree = require('./index')
  , fs = require('fs')
  , prettyjson = require('prettyjson')
  , assert = require('assert')
  , util = require('util')
;


module.exports = {
  'primitives': function() {
    assert.deepEqual(jsontree.toTree({}), {
      "type": "Object",
      "children": []
    })

    assert.deepEqual(jsontree.toTree([]), {
      "type": "List",
      "children": []
    })

    assert.deepEqual(jsontree.toTree("value"), {
      "type": "Value",
      "value": "value",
    })

  },

  'simple object': function() {
    assert.deepEqual(jsontree.toTree({
      "key": "value"
    }), {
      "type": "Object",
      "children": [
        {
          "type": "Value",
          "name": "key",
          "value": "value"
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
      "type": "List",
      "children": [
        {
          "type": "Value",
          "value": "value1"
        },
        {
          "type": "Object",
          "children": [
            {
              "type": "Value",
              "name": "key",
              "value": "value"
            }
          ]
        },
        {
          "type": "Value",
          "value": "value3"
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
      "type": "Object",
      "children": [
        {
          "type": "Value",
          "name": "key",
          "value": "value"
        },
        {
          "type": "List",
          "name": "list",
          "children": [
            {
              "type": "Value",
              "value": "one"
            },
            {
              "type": "Value",
              "value": "two"
            }
          ]
        },
        {
          "type": "Object",
          "name": "object",
          "children": [
            {
              "type": "Value",
              "name": "woho",
              "value": "works"
            }
          ]
        }
      ]
    });
  }
};
