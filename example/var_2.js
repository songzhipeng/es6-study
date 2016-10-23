'use strict';

var x = 1;
(() => {
	console.log(typeof(x), x);
	var x = "2";
	console.log(typeof(x), x);
})();
console.log(typeof(x), x);
