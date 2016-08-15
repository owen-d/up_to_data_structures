'use strict';

const expect = require('chai').expect;
const Heap = require('./');
const _ = require('lodash');

describe('Heap', () => {
  it('should allow iteration', done => {
    // min heap
    let h = new Heap(5, -1);
    h.insert(1)
    h.insert(3)
    h.insert(4)
    h.insert(2)

    assertOrder(h);
    done();
  });

  it('should support heapify', done => {
    // min heap
    let input = initializeRandomArray(1000);
    let h = new Heap(input.length, -1);
    h.heapify(input)
    assertOrder(h, -1);
    done();
  });

  it('should support max heaps', done => {
    let input = initializeRandomArray(1000);
    let h = new Heap(input.length, 1);
    h.heapify(input);
    assertOrder(h, 1);
    done();
  });
});



function assertOrder(heap, order=-1) {
  let prop = order < 0 ? 'most' : 'least' ;
  let last;
  for (let v of heap) {
    last = last === undefined ? v : last;
    expect(last).to.be.at[prop](v)
    last = v;
  }
}

function initializeRandomArray(size) {
  return _.map(Array(size), x => Math.floor(Math.random()* 1000))
}
