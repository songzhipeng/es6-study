'use strict';

let z = 1;
{
	// console.log(typeof(z), z); // ReferenceError: z is not defined
	let z = "2";
	console.log(typeof(z), z); // string 2
}
console.log(typeof(z), z); // number 1
