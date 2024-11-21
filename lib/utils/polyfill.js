'use strict';
(function () {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__global__', {
    get: function () {
      return this;
    },
    configurable: true,
  });
  // @ts-ignore
  __global__.globalThis = __global__;
  // @ts-ignore
  delete Object.prototype.__global__;
})();
