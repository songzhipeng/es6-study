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