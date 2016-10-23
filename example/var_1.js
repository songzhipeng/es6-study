'use strict';

var y = 1;
{
	console.log(typeof(y), y);
	var y = '2';
	console.log(typeof(y), y);
}
console.log(typeof(y), y);
