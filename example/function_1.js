'use strict';

{
	let f1 = function(n) {
		return n*n;
	}
	let f2 = n => n*n;
	console.log(f1(3), f2(3));
}

{
	let f1 = function() {
		return 3;
	}
	let f2 = () => 3;
	console.log(f1(), f2());
}

{
	let f1 = function(a, b) {
		return a+b;
	}
	let f2 = (a, b) => a+b;
	console.log(f1(2, 6), f2(2, 6));
}

{
	let f = (a, b) => ({a: a, b: b});
	console.log(f(1, 2));
}

{
	let f = (a, b, c) => {
		let d = a + b;
		return c * d;
	};
	console.log(f(1, 2, 4));
}

{
	const isEven = n => n % 2 == 0;
	const squre = n => n * n;
	console.log(isEven(3));
	console.log(squre(3));
}

{
	console.log([1, 2, 3].map(n => n * n));
}

{
	let sortedArr2 = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10].sort((a, b) => a - b); // 升序
	let sortedArr1 = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10].sort((a, b) => a + b); // 降序
	console.log(sortedArr1);
	console.log(sortedArr2);
}

