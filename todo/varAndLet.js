'use strict';

console.log('测试1');

var x = 1;
(() => {
	console.log(typeof(x), x); // undefined undefined
	var x = "2";
	console.log(typeof(x), x); // string 2
})();
console.log(typeof(x), x); // number 1


console.log('测试2');

var y = 1;
{
	console.log(typeof(y), y); // number 1
	var y = "2";
	console.log(typeof(y), y); // string 2
}
console.log(typeof(y), y); // string 2


console.log('测试3');

let z = 1;
{
	// console.log(typeof(z), z); // 报错
	let z = "2";
	console.log(typeof(z), z); // string 2
}
console.log(typeof(z), z); // number 1

