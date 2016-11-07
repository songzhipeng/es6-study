# ECMAScript 引用类型(TODO)
#es6

[ECMAScript 引用类型](http://www.w3school.com.cn/js/pro_js_referencetypes.asp)


# 类型转换
#es6
* 转换成字符串
Boolean、Number、String的原始值是伪对象，它们有属性和方法。因为它们都有 toString() 方法，可以把它们的值转换成字符串。
    let s = "zero";
    console.log(s.length); // 4

Number 类型的 toString() 方法比较特殊，它有两种模式，即默认模式和基模式。
    let num = 15;
    console.log(num.toString()); // 15
    console.log(num.toString(10)); // 15
    console.log(num.toString(8)); // 17
    console.log(num.toString(16)); // f

* 转换成数字
ECMAScript 提供了两种把非数字的原始值转换成数字的方法，即 parseInt() 和 parseFloat()。
只有对 String 类型调用这些方法，它们才能正确运行；对其他类型返回的都是 NaN。

* parseInt()
parseInt()方法首先查看位置 0 处的字符，判断它是否是个有效数字；如果不是，该方法将返回 NaN，不再继续执行其他操作。但如果该字符是有效数字，该方法将查看位置 1 处的字符，进行同样的测试。这一过程将持续到发现非有效数字的字符为止，此时 parseInt() 将把该字符之前的字符串转换成数字。
parseInt() 方法还有基模式，可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数。基是由 parseInt() 方法的第二个参数指定的
    console.log(parseInt("123zero456")); // 123
    console.log(parseInt("zero123")); // NaN
    console.log(parseInt("22.5")); // 22
    console.log(parseInt("0xF")); // 15
    console.log(parseInt("11")); // 11
    console.log(parseInt("11", 2)); // 3
    console.log(parseInt("11", 8)); // 9
    console.log(parseInt("11", 10)); // 11
    console.log(parseInt("11", 16)); // 17

* parseFloat()
parseFloat() 方法与 parseInt() 方法的处理方式相似，从位置 0 开始查看每个字符，直到找到第一个非有效的字符为止，然后把该字符之前的字符串转换成整数。
不过，对于这个方法来说，第一个出现的小数点是有效字符。如果有两个小数点，第二个小数点将被看作无效的。parseFloat() 会把这个小数点之前的字符转换成数字。这意味着字符串 "11.22.33" 将被解析成 11.22。
使用 parseFloat() 方法的另一不同之处在于，字符串必须以十进制形式表示浮点数，而不是用八进制或十六进制。该方法会忽略前导 0。
parseFloat() 方法没有基模式。

* 强制类型转换
ECMAScript 中可用的 3 种强制类型转换如下：
1. Boolean(value) - 把给定的值转换成 Boolean 型；
2. Number(value) - 把给定的值转换成数字（可以是整数或浮点数）；
3. String(value) - 把给定的值转换成字符串；

* Boolean()
当要转换的值是至少有一个字符的字符串、非 0 数字或对象时，Boolean() 函数将返回 true。如果该值是空字符串、数字 0、undefined 或 null，它将返回 false。
    console.log(Boolean()); // false
    console.log(Boolean('')); // false
    console.log(Boolean(null)); // false
    console.log(Boolean(undefined)); // false
    console.log(Boolean(0)); // false
    
    console.log(Boolean(' ')); // true
    console.log(Boolean(-1.5)); // true
    console.log(Boolean({})); // true

* Number()
用 Number() 进行强制类型转换，"1.2.3" 将返回 NaN，因为整个字符串值不能转换成数字。如果字符串值能被完整地转换，Number() 将判断是调用 parseInt() 方法还是 parseFloat() 方法。
    console.log(Number()); // 0
    console.log(Number('')); // 0
    console.log(Number(null)); // 0
    console.log(Number(0)); // 0
    console.log(Number('0')); // 0
    console.log(Number(' ')); // 0
    console.log(Number(false)); // 0
    console.log(Number(true)); // 1
    console.log(Number(-1.5)); // -1.5
    console.log(Number(-1.0)); // -1
    console.log(Number({})); // NaN
    console.log(Number(undefined)); // NaN

* String()
把任何值转换成字符串。
    console.log(String()); //
    console.log(String('')); //
    console.log(String(null)); // null
    console.log(String(0)); // 0
    console.log(String('0')); // 0
    console.log(String(' ')); //
    console.log(String(-1.5)); // -1.5
    console.log(String(-1.0)); // -1
    console.log(String({})); // [object Object]
    console.log(String(undefined)); // undefined
    console.log(String(false)); // false

    console.log(String(null)); // null
    console.log(String(undefined)); // undefined
    console.log(null.toString()); // TypeError: Cannot read property 'toString' of null
    console.log(undefined.toString()); // TypeError: Cannot read property 'toString' of undefined


# 原始值和引用值
#es6
* 在 ECMAScript 中，变量可以存在两种类型的值，即原始值和引用值。
1. 原始值
	存储在栈（stack）中的简单数据段，它们的值直接存储在变量访问的位置。
2. 引用值
	存储在堆（heap）中的对象，存储在变量处的值是一个指针（point），指向存储对象的内存处。

* 原始类型
ECMAScript 有 5 种原始类型（primitive type），即 Undefined、Null、Boolean、Number 和 String。

* typeof运算符
判断一个值是否表示一种原始类型：如果它是原始类型，还可以判断它表示哪种原始类型
对变量或值调用 typeof 运算符将返回下列值之一：
    undefined - 如果变量是 Undefined 类型的
    boolean - 如果变量是 Boolean 类型的
    number - 如果变量是 Number 类型的
    string - 如果变量是 String 类型的
    object - 如果变量是一种引用类型或 Null 类型的

* Undefined 类型
Undefined 类型只有一个值，即 undefined。

* 当声明的变量未初始化时，该变量的默认值是 undefined。
    var a;
    
    console.log(typeof a); // undefined
    console.log(typeof b); // undefined
    console.log(typeof c); // ReferenceError: c is not defined
    
    let c;

如果对未声明的变量使用除 typeof 之外的其他运算符的话，会引起错误，因为其他运算符只能用于已声明的变量上。
    let a;
    console.log(b == undefined); // ReferenceError: b is not defined

* 当函数无明确返回值时，返回的也是值 "undefined"
    function testFunc() {
    }
    
    console.log(testFunc() === undefined); // true

* Null 类型
只有一个值，null

    console.log(null == undefined); // true
    console.log(null === undefined); // false

* Boolean 类型
有两个值，true和false

* Number 类型
既可以表示 32 位的整数，还可以表示 64 位的浮点数。

* 八进制数和十六进制数
整数也可以被表示为八进制（以 8 为底）或十六进制（以 16 为底）的字面量。八进制字面量的首数字必须是 0，其后的数字可以是任何八进制数字（0-7），但严格模式下是不被允许的。
    'use strict';
    let a = 070; // SyntaxError: Octal literals are not allowed in strict mode.

要创建十六进制的字面量，首位数字必须为 0，后面接字母 x，然后是任意的十六进制数字（0 到 9 和 A 到 F）。这些字母可以是大写的，也可以是小写的。

    let a = 0x10;

* 浮点数
用它进行计算前，真正存储的是字符串。

* 0，null，undefined，false之间的不同
    console.log(typeof 0); // number
    console.log(typeof null); // object
    console.log(typeof undefined); // undefined
    console.log(typeof false); // boolean

* 科学计数法
对于非常大或非常小的数，可以用科学计数法表示浮点数，可以把一个数表示为数字（包括十进制数字）加 e（或 E），后面加乘以 10 的倍数。
    let a = 1.23e3; // 1230

* 特殊的 Number 值
Number.MAX_VALUE
Number.MIN_VALUE
Number.POSITIVE_INFINITY，等同于Infinity
Number.NEGATIVE_INFINITY，等同于-Infinity
    let a = Number.POSITIVE_INFINITY;
    let b = Infinity;
    console.log(a === b); // true
    console.log(b+1); // Infinity

NaN，表示非数，一般说来，这种情况发生在类型（String、Boolean 等）转换失败时。
它与自身不相等。
    console.log(NaN == NaN); // false
    console.log(NaN === NaN); // false

所以应该使用isNaN()函数
    console.log(isNaN("123")); // false
    console.log(isNaN("zero")); // true

* String类型
它是唯一没有固定大小的原始类型。
字符串字面量是由双引号（"）或单引号（'）声明的，ECMAScript 没有字符类型。



# 基本语法
#es6
* 大小写敏感
* 弱类型
可以随时改变变量所存数据的类型，但尽量避免这么做。
* 分号可有可无
详见"ES6分号"
* 单行注释//，多行注释/**/
* 代码块{}

# 箭头函数
#es6
ES6允许使用“箭头”（=>）定义函数。

    let f = v => v*v;

上面的箭头函数等同于：

    let f = function(v) {
      return v*v;
    };

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

    let f = () => 5;
    // 等同于
    let f = function () { return 5 };
    
    let sum = (num1, num2) => num1 + num2;
    // 等同于
    let sum = function(num1, num2) {
      return num1 + num2;
    };

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

    let sum = (num1, num2) => { return num1 + num2; }

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

    let getTempItem = id => ({ id: id, name: "Temp" });

箭头函数可以与变量解构结合使用。

    const full = ({ first, last }) => first + ' ' + last;
    
    // 等同于
    function full(person) {
      return person.first + ' ' + person.last;
    }

箭头函数使得表达更加简洁。

    const isEven = n => n % 2 == 0;
    const square = n => n * n;

箭头函数的一个用处是简化回调函数。

    // 正常函数写法
    [1,2,3].map(function (x) {
      return x * x;
    });
    
    // 箭头函数写法
    [1,2,3].map(x => x * x);

另一个例子是

    // 正常函数写法
    let result = values.sort(function (a, b) {
      return a - b;
    });
    
    // 箭头函数写法
    let result = values.sort((a, b) => a - b);

下面是rest参数与箭头函数结合的例子。

    const numbers = (...nums) => nums;
    
    numbers(1, 2, 3, 4, 5)
    // [1,2,3,4,5]
    
    const headAndTail = (head, ...tail) => [head, tail];
    
    headAndTail(1, 2, 3, 4, 5)
    // [1,[2,3,4,5]]



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

# 函数参数的默认值
#es6
ES5写法：
    function log(x) {
      x = x || 'default_value';
      console.log('x:', x);
    }
    
    log();
    log(undefined);
    log(null);
输出结果：
    x: default_value
    x: default_value
    x: default_value

ES6写法：
    function log(x = 'default_value') {
      console.log('x:', x);
    }
    
    log();
    log(undefined);
    log(null);
输出结果：
    x: default_value
    x: default_value
    x: null

* ES6的写法好处
1. 简洁直观
2. 阅读代码的人，可以立刻意识到哪些参数是可以省略的
3. 有利于将来的代码优化

* 与解构赋值默认值结合使用

    function fetch(url, { method = 'GET' } = {}) {
      console.log(method);
    }
    
    fetch('http://example.com'); // GET

上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。

下面两种写法有什么差别？

    // 写法一
    function m1({x = 0, y = 0} = {}) {
      return [x, y];
    }
    
    // 写法二
    function m2({x, y} = { x: 0, y: 0 }) {
      return [x, y];
    }

上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

    // 函数没有参数的情况
    m1() // [0, 0]
    m2() // [0, 0]
    
    // x和y都有值的情况
    m1({x: 3, y: 8}) // [3, 8]
    m2({x: 3, y: 8}) // [3, 8]
    
    // x有值，y无值的情况
    m1({x: 3}) // [3, 0]
    m2({x: 3}) // [3, undefined]
    
    // x和y都无值的情况
    m1({}) // [0, 0];
    m2({}) // [undefined, undefined]
    
    m1({z: 3}) // [0, 0]
    m2({z: 3}) // [undefined, undefined]

* 参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

    // 例一
    function f(x = 1, y) {
      return [x, y];
    }
    
    f() // [1, undefined]
    f(2) // [2, undefined])
    f(, 1) // 报错
    f(undefined, 1) // [1, 1]
    
    // 例二
    function f(x, y = 5, z) {
      return [x, y, z];
    }
    
    f() // [undefined, 5, undefined]
    f(1) // [1, 5, undefined]
    f(1, ,2) // 报错
    f(1, undefined, 2) // [1, 5, 2]

上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

    function foo(x = 5, y = 6) {
      console.log(x, y);
    }
    
    foo(undefined, null)
    // 5 null

* 函数的length属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。

    (function (a) {}).length // 1
    (function (a = 5) {}).length // 0
    (function (a, b, c = 5) {}).length // 2

上面代码中，length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。比如，上面最后一个函数，定义了3个参数，其中有一个参数c指定了默认值，因此length属性等于3减去1，最后得到2。

这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，rest参数也不会计入length属性。

    (function(...args) {}).length // 0

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

    (function (a = 0, b, c) {}).length // 0
    (function (a, b = 1, c) {}).length // 1

* 应用

    function throwIfMissing() {
      throw new Error('Missing parameter');
    }
    
    function throwIfParameterTypeNotEqual(param, type) {
      if (typeof(param) !== type) {
        throw new Error('Parameter type error')
      }
    }
    
    function func(n = throwIfMissing()) {
      throwIfParameterTypeNotEqual(n, 'number');
      return n*n;
    }
    
    
    console.log(func(3));
    console.log(func()); // 报错
    console.log(func('1')); // 报错



# 注意数据类型的特殊性(TODO)
#es6
    引用：http://sentsin.com/web/55.html


# 处理特殊值(TODO)
#es6
    引用：http://sentsin.com/web/58.html

# 分号(TODO)
#es6
    引用：http://sentsin.com/web/56.html

js有一个彪悍的机制，即只要在一行内检测到是一个有效的语句，就会自动给结尾加上分号，这种“智能”往往纵容了js程序员的惰性，对此，js饱受争议，一个阵营是褒扬js的灵活性，另一个阵营很严肃地贬低js的不严谨性。但无论怎样，**语言的出发点都没错，错的是你的习惯。**

JavaScript语言有一个机制：在解析时，能够在一句话后面自动插入一个分号，用来修改语句末尾遗漏的分号分隔符。然而，由于这个自动插入的分号与JavaScript语言的另一个机制发生了冲突，即所有空格符都被忽略，因此程序可以利用空格格式化代码。

这两种机制的冲突，很容易掩盖更为严重的解析错误。有时会不合时宜地插入分号。例如，在return语句中自动插入分号将会导致这样的后果：如果return语句要返回一个值，这个值的表达式的开始部分必须和return在同一行上，例如：
    let f = function(){
      return
      {
        status: true
      };
    };
    
    console.log(f());
输出结果：
    undefined

看起来这里要返回一个包含status成员元素的对象。不幸的是，JavaScript自动插入分号让它返回了undefined，从而导致下面真正要返回的对象被忽略。

当自动插入分号导致程序被误解时，并不会有任何警告提醒。如果把{放在上一行的尾部而不是下一行的头部，就可以避免该问题，例如：
    let f = function(){
      return {
        status: true
      };
    };
    
    console.log(f());

为了避免省略分号引起的错误，建议养成好的习惯，不管一行内语句是否完整，只要是完整的语句都必须增加分号以表示句子结束。

为了方便阅读，当长句子需要分行显示时，在分行时应确保一行内不能形成完整的逻辑语义。例如，下面代码是一条连续赋值的语句，通过分行显示可以更清楚地查看它们的关系。这种分行显示，由于一行内不能形成独立的逻辑语义，因此JavaScript不会把每一行视为独立的句子，从而不会产生歧义。

    var a =
       b =
       c =  4;

以上语句在一行内显示如下：
    var a = b = c = 4;

对于下面这条语句，如果不能正确分行显示，就很容易产生歧义。该句子的含义：定义一个变量i，然后为其赋值，如果变量a为true，则赋值为1，否则就判断变量b，如果b为true，则赋值为2，否则就判断变量c，如果c为true，则赋值为3，否则赋值为4。

    let i = a ? 1 : b ? 2 : c ? 3 : 4;

下面的分行显示就是错误的，因为表达式a ? 1: b能够形成独立的逻辑语义，所以JavaScript会自动在其后添加分号来表示一个独立的句子。

    var i = a ? 1: b
           ? 2 : c
           ? 3 : 4;

安全的方法应该采用如下的分行显示，这样每一行都不能形成独立的语义。

    var i = a ? 1
         : b ? 2
         : c ? 3
         : 4;
**结论：在编写代码时，应养成使用分号结束句子的良好习惯，凡是完整的句子就应该使用分号进行分隔。分行显示的句子应该确保单行不容易形成独立的合法的逻辑语义。**

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


# 等于
#es6
    引用：https://www.zhihu.com/question/31442029/answer/77772323

==副作用
    let x = 1;
    let obj = {valueOf: function(){ x = 2; return 0 }}
    console.log(obj == 0, x) // true, 2
==产生异常
    let x = 1;
    let obj = {valueOf: function(){ return {} }, toString: function(){ return {}}}
    console.log(obj == 0) // Error: Cannot convert object to primitive value

**结论：建议使用===，不再使用==；同理，使用!==，而尽量不使用!=**

# 简介
#es6
ECMAScript是JavaScript的一个标准，2016年。
