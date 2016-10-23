'use strict';

let z = 1;
{
	console.log(typeof(z), z);
	let z = "2";
	console.log(typeof(z), z);
}
console.log(typeof(z), z);
