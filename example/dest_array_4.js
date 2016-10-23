'use strict';


let x, y;
[x, y = 'b'] = ['a'];
console.log(x, y); // a b
[x, y = 'b'] = ['a', undefined];
console.log(x, y); // a b
[x, y = 'b'] = ['a', null];
console.log(x, y); // a null
