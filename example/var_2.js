'use strict';

var x = 1;
(() => {
	console.log(typeof(x), x); // undefined undefined
	var x = "2";
	console.log(typeof(x), x); // string 2
})();
console.log(typeof(x), x); // number 1
