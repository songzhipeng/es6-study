# undefined与null
#es6
Undefined类型只有一个值，即undefined。当声明的变量还未被初始化时，变量的默认值为undefined。
Null类型也只有一个值，即null。null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。
    console.log( undefined == null ); // true
    console.log( undefined === null ); // false
    let a;
    console.log( a ); // undefined
    console.log(typeof(undefined)); // undefined
    console.log(typeof(null)); // object
