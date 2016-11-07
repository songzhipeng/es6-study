'use strict';

console.log(String(null)); // null
console.log(String(undefined)); // undefined
console.log(null.toString()); // TypeError: Cannot read property 'toString' of null
console.log(undefined.toString()); // TypeError: Cannot read property 'toString' of undefined
