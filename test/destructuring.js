'use strict';

console.log('例子1');
{
	function f() {
	  return 1;
	}

	let [x = f()] = [null];

	console.log(x);
}

console.log('例子2');
'等价于例子1';
{
	function f() {
	  return 1;
	}

	let x;

	if ([null][0] === undefined) {
		x = f();
	} else {
		x = [null][0]
	}

	console.log(x);
}

console.log('例子3');
{
	let {b, a} = {a: 1};
	console.log(a, b);
}

console.log('例子4');
'等价于例子3，例子3是简写';
{
	let {b: b, a: a} = {a: 1};
	console.log(a, b);
}

console.log('例子5');
{
	let a;
	({a: a} = {a: 2}); // 外面的()是必须的，是为了让编译器知道这是一条赋值语句，而不是代码块
	console.log(a);
}

console.log('例子6');
{
	let a = {b: {c: {d: 1, e:2}}};
	let {b: {c: {d, e}}} = a;
	console.log('a:', a); // a: { b: { c: { d: 1, e: 2 } } }
	// console.log('b:', b); // 报错，因为b是模式，而不是变量
	// console.log('c:', c); // 报错，因为c是模式，而不是变量
	console.log('d:', d); // d: 1
	console.log('e:', e); // e: 2
}

console.log('例子7');
{
	let dic = {};
	let arr = [];

	({ a: dic.x, b: arr[1] } = { a: 123, b: true });

	console.log('dic:', dic); // dic: {x:123}
	console.log('arr:', arr); // arr: [ , true ]
	console.log('arr[0]:', arr[0]); // arr[0]: undefined
}

console.log('例子8');
{
	let {a: b = 1} = {};
	console.log('b:', b); // b: 1
}

console.log('例子9');
{
	let a = ['x', 'y', 'z'];
	let {1: b, 2: c, 4: d} = a; // 数组本身是个特殊的对象，属性名(key值)从0到length-1，即解构时，[1]等价于{0: 1}
	console.log('b:', b);
	console.log('c:', c);
	console.log('d:', d);
}

console.log('例子10');
{
	console.log([1]['0']);
	console.log([1][0]); // 会把下标0转成'0'
	console.log({0: 1});
}

console.log('例子11');
{
	let str = 'hello';
	let [a, b, c, d, e] = str; // 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象
	console.log(c); // c
	console.log([c]); // ['c']
	let {length : len} = str; // 数组的对象都有一个length属性，因此还可以对这个属性解构赋值
	console.log('len:', len); // len: 5
	str = 'hi';
	console.log('len:', len); // len: 5
}

console.log('例子12');
{
	let {toString: num} = 123;
	console.log(num === Number.prototype.toString); // true

	let {toString: bool} = true;
	console.log(bool === Boolean.prototype.toString); // true
}

console.log('例子13');
'解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。';
{
	// let { prop: x } = undefined; // 报错
	// let { prop: y } = null; // 报错
}

console.log('例子14');
{
	function f(a = 1) {
		console.log(a);
	}

	f(2);
	f();
}

