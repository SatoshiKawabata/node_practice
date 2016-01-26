// イテレータパターン

const iterable = {
  someData: ['I', 'like', 'meat'],
  hasNext: function() {
    return this.someData.length > 0;
  },
  next: function() {
    this.someData.shift();
  }
};

while(iterable.hasNext()) {
  console.log(iterable.someData);
  iterable.next();
}