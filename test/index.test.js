describe('polymorphism tests', function () {
  require('..');

  describe('`Function.prototype.extend`', function () {
    it('should be non-enumberable', function () {
      Function.prototype.extend.should.be.ok;
      Function.prototype.should.not.include.key('extend');
    });

    it('should not be writable', function () {
      Function.prototype.extend = 'foo';
      Function.prototype.extend.should.not.equal('foo');
      Function.prototype.extend.should.be.a('function');
    });

    it('should not be configurable', function () {
      try {
        Object.defineProperty(Function.prototype, 'extend', {
          value: 'foo'
        });
      } catch (e) {
        e.should.be.instanceOf(Error);
        e.message.should.equal('Cannot redefine property: extend');
      }
      Function.prototype.extend.should.be.ok;
      delete Function.prototype.extend;
      Function.prototype.extend.should.be.ok;
    })
  });

  describe('`Function.prototype.extend` tests', function () {
    beforeEach(function () {
      this.P = function () {};
      this.C = function () {};
      this.C.extend(this.P);
    });

    it('should properly extend a function', function () {
      var c = new this.C();
      c.should.be.instanceOf(this.P);
      c.should.be.instanceOf(this.P);
    });

    it('should provide `super_` property', function () {
      this.C.super_.should.equal(this.P);
    });
  });
});
