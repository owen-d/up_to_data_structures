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
    const randoms = new Set(_.map(_.range(20), () => Math.floor(Math.random() * 1000)));

    _.forIn(randoms, r => tree.add(r));

    let val = randoms[5];
    expect(tree.contains(val)).to.equal(true);
  });

  it('should remove', done => {
    const randoms = _.map(_.range(20), () => Math.floor(Math.random() * 1000));

    _.forEach(randoms, r => tree.add(r));

    let val = randoms[5];
    expect(tree.remove(val)).to.equal(true);
    expect(tree.contains(val)).to.equal(false);
  });
});
