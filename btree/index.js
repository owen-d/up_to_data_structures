'use strict';
const _ = require('lodash');
const MINIMUM = 2;

function isNum(val) {
  return typeof val === 'number';
}

function Tree() {
  this.vals = [];
  this.children = [];
}

Tree.prototype.add = function(addition) {
};
Tree.prototype.contains = function(target) {
  const hasChildren = this.children.length > 0;
  const gteIdx = _.reduce(this.vals, (accum, val, idx) => {
    return isNum(accum) ? accum : val >= target && idx;
  }, false);

  if (isNum(gteIdx)) {
    // if we found a greater than || equal to idx in children, either return the match, the appropriate child to search, or false (if none apply).
    return this.vals[gteIdx] === target ? true : hasChildren ? this.children[gteIdx].contains(target) : false;
  } else {
    // out of bounds. Check the last child || return false.
    return hasChildren ? _.last(this.children).contains(target) : false;
  }
};

Tree.prototype.remove = function(first_argument) {
  // body...
};

module.exports = Tree;
