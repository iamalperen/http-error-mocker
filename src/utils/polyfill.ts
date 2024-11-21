(function () {
  if (typeof globalThis === 'object') return;

  Object.defineProperty(Object.prototype, '__global__', {
    get: function () {
      return this;
    },
    configurable: true,
  });

  // @ts-expect-error globalThis polyfill
  __global__.globalThis = __global__;

  // @ts-expect-error globalThis polyfill
  delete Object.prototype.__global__;
})();
