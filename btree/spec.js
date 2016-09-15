'use strict';

const expect = require('chai').expect;
const BTree = require('./');
const _ = require('lodash');

var tree;
describe('BTree', () => {
  beforeEach(() => {
    tree = new BTree();
  });

  it('should create and insert', () => {
    expect(() => {
      tree.add(2);
    }).to.not.throw();
  });

  it('should find', done => {
    const randoms = _.map(_.range(20), () => Math.floor(Math.random() * 1000));

    _.reduce(randoms, (tree, num) => tree.add(num), tree);

    let val = randoms[5];
    expect(tree.contains(val)).to.equal(true);
  });

  it('should remove', done => {
    const randoms = _.map(_.range(20), () => Math.floor(Math.random() * 1000));

    _.reduce(randoms, (tree, num) => tree.add(num), tree);

    let val = randoms[5];
    expect(tree.remove(val)).to.equal(true);
    expect(tree.contains(val)).to.equal(false);
  });
});
