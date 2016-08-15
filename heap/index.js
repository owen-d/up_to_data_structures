'use strict';
const _ = require('lodash');
// es5
// function Heap(order=1) {}
// Heap.prototype.constructor = Heap;

// will run min-heap first
class Heap {
  constructor(size, order=-1) {
    this.clearStore(size)
    this._order = order;
    this._shiftDownFilter = order < 0 ? (a, b) => b <= a : a <= b;
    this._shiftUpFilter = _.negate(this._shiftDownFilter)
  }
  [Symbol.iterator] () {
    const unallowed = [undefined, null];
    return {
      next: () => {
        let cur = this.extract();
        let res = {
          value: cur,
          done: _.indexOf(unallowed, cur) !== -1
        };
        return res;
      }
    };
  }
  insert(val) {
    let i = this.firstOpen();
    this._store[i] = val
    return this.shiftUp(i);
  }
  extract() {
    let val = this._store[0];
    this._store[0] = null;
    this.shiftDown(0)
    return val;
  }
  replace() {}
  heapify(arr) {
    this.clearStore()
    for (let item of arr) {
      this.insert(item);
    }
  }
  size() {
    return this._store.length;
  }
  isEmpty() {
    return this._store[0] === null;
  }

  // internal
  compare(p, children, filter, sort) {
    if (!sort) {throw new Error('must provide a sort order to compare')}
    return _(children).filter(filter).orderBy(null, sort).value();
  }
  fetch(i) {
    return this._store[i];
  }
  delete() {}
  shiftUp(i) {
    let val = this._store[i];
    let [pIdx, pVal] = this.getParent(i)
    if (this._order < 0 ? val < pVal : val > pVal) {
      this.swap([i, val], [pIdx, pVal])
      return this.shiftUp(pIdx);
    } else {
      return i;
    }
  }
  shiftDown(i) {
    let val = this._store[i];
    // [[c1Idx, c1Val], [c2Idx, c2Val]] = this.getChildren(i);
    let order = this._order < 0 ? 'asc': 'desc';
    let filter = val === null ? ([i, val]) => !_.isNull(val) && !_.isUndefined(val) : this._shiftDownFilter.bind(null, val)
    let matches = this.compare(val, this.getChildren(i), filter, order);
    if (matches.length) {
      this.swap([i, val], matches[0]);
      return this.shiftDown(matches[0][0]);
    } else {
      val === null ? this._store[i] = undefined : void 0;
      return i;
    }
  }
  swap(a, b) {
    // nodes take structure [idx, val]
    this._store[a[0]] = b[1];
    this._store[b[0]] = a[1];
  }
  getChildren(i) {
    let firstIdx = 2 * i + 1;
    let secondIdx = 2 * i + 2;
    return [[firstIdx, this.fetch(firstIdx)], [secondIdx, this.fetch(secondIdx)]];
  }
  getParent(i) {
    let idx = Math.floor((i-1)/2)
    return [idx, this.fetch(idx)];
  }
  firstOpen() {
    return _.indexOf(this._store, null);
  }
  clearStore(size) {
    size = size || this._store.length
    this._store = _.fill(Array(size), null);
  }
}

module.exports = Heap;
