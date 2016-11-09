'use strict';

var y = 1;
{
	console.log(typeof(y), y); // number 1
	var y = '2';
	console.log(typeof(y), y); // string 2
}
console.log(typeof(y), y); // string 2
