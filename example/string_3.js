'use strict';


{
	const a = 1;
	const s = `a = \`
	    ${a}
	\``;
	console.log(s);
}

{
	function hello(a) {
		return a*a;
	}
	const c = hello`5`;
	console.log(c);
}
