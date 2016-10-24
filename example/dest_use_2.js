'use strict';


// 返回一个数组
{
	function example() {
	  return [1, 2, 3];
	}
	const [a, b, c] = example();
	console.log(a, b, c);
}

// 返回一个对象
{
	function example() {
	  return {
	    foo: 1,
	    bar: 2
	  };
	}
	const { foo, bar } = example();
	console.log(foo, bar);
}
