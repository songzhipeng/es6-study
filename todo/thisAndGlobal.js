// 'use strict';

(() => {
	console.log(this); // {}
})();

function f() {
	if (this === global) {
		console.log('global'); // strict => undefined
	} else{
		console.log(this); // not strict => global
	}
}
f();