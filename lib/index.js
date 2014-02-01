// Define non-enumerable `extend` function on `Function.prototype`
Object.defineProperty(Function.prototype, 'extend', {
  value: function (P) {
    // Match functionality from `require('util').inherits
    this.super_ = P;
    // Create prototype with proper `constructor` property
    this.prototype = Object.create(P.prototype, {
      constructor: {
        value: P,
        writable: true,
        configurable: true
      }
    });
  }
});
