'use strict';


console.log('测试1');

var y = 1;
{
	console.log(typeof(y), y); // number 1
	var y = "2"; // 这里发生了变量提升，即覆盖了上面的var y = 1;的定义
	console.log(typeof(y), y); // string 2
}
console.log(typeof(y), y); // string 2

'总结';
'使用var会有变量提升的问题';
'var无视大括号的作用域';




console.log('测试2');

var x = 1;
(() => {
	console.log(typeof(x), x); // undefined undefined
	var x = "2"; // 这里不会发生变量提升，因为在函数里
	console.log(typeof(x), x); // string 2
})();
console.log(typeof(x), x); // number 1

'总结';
'var有两种作用域，函数和全局，其它都不构成内部作用域';


console.log('测试3');

let z = 1;
{
	// console.log(typeof(z), z); // 报错，因为在{}内定义了z，因此外部的z就失效了，即在{}内，z的定义为let z = "2";，而在定义之前调用变量z当然会触发报错
	let z = "2"; // 不会触发变量提升，因为let可以受{}作用域影响
	console.log(typeof(z), z); // string 2
}
console.log(typeof(z), z); // number 1

'总结';
'let的作用域可以受{}约束，当然也可以受函数约束';
'因此我们使用let而不是var';
'忘了var，作用域不再混淆';

