An _Ordered Labeled Tree_(OLT) is a data structure that consists of nodes
with _labels_ and _children_, where the children are nodes themselves.
The order of the children is significant. There are a number of
algorithms for calculating the difference (like the `diff` command does
for text data) for these data structures.

This module takes a JSON data structure and creates a corresponding OLT.

```javascript
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

```

Note that each node has up to four fields:

- type
- name
- value
- children

This is not a problem, since the set [type, name, value] can be
considered as the label of the node.

## Why

I'm looking into creating a diff tool for the Abstract Syntax Tree's of
JavaScript code. The AST can be generated using
[esprima](http://esprima.org), but this will give us a syntax tree in
the format of a JavaScript object. The existing algorithms for
calculating tree differences only works on OLT's.

See _Simple fast algorithms for the editing distance between trees and
related problems_ by K. Zhang and D. Shasha.

