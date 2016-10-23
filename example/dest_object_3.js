'use strict';



let dic = {};
let arr = [];

({ a: dic.x, b: arr[1] } = { a: 123, b: true });

console.log('dic:', dic); // dic: {x:123}
console.log('arr:', arr); // arr: [ , true ]
console.log('arr[0]:', arr[0]); // arr[0]: undefined