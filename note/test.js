'use strict';

function throwIfMissing() {
  throw new Error('Missing parameter');
}

function throwIfParameterTypeNotEqual(param, type) {
  if (typeof(param) !== type) {
    throw new Error('Parameter type error')
  }
}

function func(n = throwIfMissing()) {
  throwIfParameterTypeNotEqual(n, 'number');
  return n*n;
}


console.log(func(3));
console.log(func()); // 报错
console.log(func('1')); // 报错
