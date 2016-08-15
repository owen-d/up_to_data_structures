// es5
// function Heap(order=1) {}
// Heap.prototype.constructor = Heap;
// es6
class Heap {
  constructor() {
    this._store = [];
  }
}

export default Heap
