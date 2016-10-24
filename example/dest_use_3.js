'use strict';


// 参数是一组有次序的值
function f1([x, y, z]) { ... }
f1([1, 2, 3]);

// 参数是一组无次序的值
function f2({x, y, z}) { ... }
f2({z: 3, y: 2, x: 1});