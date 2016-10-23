'use strict';


'使用嵌套数组进行解构';
{
	let a = {b: {c: {d: 1, e:2}}};
	let {b: {c: {d, e}}} = a;
	console.log('a:', a); // a: { b: { c: { d: 1, e: 2 } } }
	// console.log('b:', b); // 报错，因为b是模式，而不是变量
	// console.log('c:', c); // 报错，因为c是模式，而不是变量
	console.log('d:', d); // d: 1
	console.log('e:', e); // e: 2
}


