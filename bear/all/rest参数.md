# rest参数
#es6
arguments变量的写法

    function sortNumbers() {
      return Array.prototype.slice.call(arguments).sort();
    }

rest参数的写法

    const sortNumbers = (...numbers) => numbers.sort();

rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量，如forEach。
rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
函数的length属性，不包括rest参数。

* 应用

合并数组

    let arr1 = ['a', 'b'];
    let arr2 = ['c'];
    let arr3 = ['d', 'e'];
    
    // ES5的合并数组
    arr1.concat(arr2, arr3);
    // [ 'a', 'b', 'c', 'd', 'e' ]
    
    // ES6的合并数组
    [...arr1, ...arr2, ...arr3]
    // [ 'a', 'b', 'c', 'd', 'e' ]

与解构赋值结合

    const [first, ...rest] = ["foo"];
    first  // "foo"
    rest   // []

函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

字符串

扩展运算符还可以将字符串转为真正的数组。

    [...'hello']
    // [ "h", "e", "l", "l", "o" ]

实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。


* 函数的length属性，不包括rest参数。