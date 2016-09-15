'use strict';
const _ = require('lodash');
const MINIMUM = 2;

function Tree() {
  this.val = null;
  this.children = [];
}

Tree.prototype.add = function(first_argument) {
  // body...
  return this;
};
Tree.prototype.contains = function(first_argument) {
  // body...
};

Tree.prototype.remove = function(first_argument) {
  // body...
};

module.exports = Tree;
