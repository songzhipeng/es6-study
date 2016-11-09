# 简介

ECMAScript是JavaScript的一个标准，2016年。

# 基本语法

* 大小写敏感
* 弱类型
  可以随时改变变量所存数据的类型，但尽量避免这么做。
* 分号可有可无
  详见"ES6分号"
* 单行注释//，多行注释/**/
* 代码块{}

# 常量、变量及作用域

* var缺点：

  1. 会导致变量提升
  2. 变量作用域不可控
  3. 容易产生副作用
  4. 代码可读性较差

  ```javascript
  var y = 1;
  {
  	console.log(typeof(y), y); // number 1
  	var y = '2';
  	console.log(typeof(y), y); // string 2
  }
  console.log(typeof(y), y); // string 2
  ```

  ```javascript
  var x = 1;
  (() => {
  	console.log(typeof(x), x); // undefined undefined
  	var x = "2";
  	console.log(typeof(x), x); // string 2
  })();
  console.log(typeof(x), x); // number 1
  ```

  ​

- ES6开始，新增了let关键字，let特点：

  1. 作用域: 所在的代码块{}中
  2. 暂时性死区: 只要块级作用域内存在let命令，它所声明的变量就“绑定”这个区域，不再受外部的影响

  ```javascript
  for (let i = 0; i < 3; i++) {
  	console.log(i);
  }
  console.log(i); // ReferenceError: i is not defined
  ```

  ```javascript
  let z = 1;
  {
  	// console.log(typeof(z), z); // ReferenceError: z is not defined
  	let z = "2";
  	console.log(typeof(z), z); // string 2
  }
  console.log(typeof(z), z); // number 1
  ```

  ​

  **不要再使用var定义变量了**







# 解构赋值

## 数组的解构赋值

### 基本用法

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

以前，为变量赋值，只能直接指定值。

```javascript
var a = 1;
var b = 2;
var c = 3;
```

ES6允许写成下面这样。

```javascript
var [a, b, c] = [1, 2, 3];
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

如果解构不成功，变量的值就等于`undefined`。

```javascript
var [foo] = [];
var [bar, foo] = [1];
```

以上两种情况都属于解构不成功，`foo`的值都会等于`undefined`。

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```javascript
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

上面两个例子，都属于不完全解构，但是可以成功。

如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的表达式都会报错，因为等号右边的值，要么转为对象以后不具备Iterator接口（前五个表达式），要么本身就不具备Iterator接口（最后一个表达式）。

解构赋值不仅适用于var命令，也适用于let和const命令。

```javascript
var [v1, v2, ..., vN ] = array;
let [v1, v2, ..., vN ] = array;
const [v1, v2, ..., vN ] = array;
```

对于Set结构，也可以使用数组的解构赋值。

```javascript
let [x, y, z] = new Set(["a", "b", "c"]);
x // "a"
```

事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。

```javascript
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

上面代码中，`fibs`是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。

### 默认值

解构赋值允许指定默认值。

```javascript
var [foo = true] = [];
foo // true

[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。

```javascript
var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null
```

上面代码中，如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```javascript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

上面代码中，因为`x`能取到值，所以函数`f`根本不会执行。上面的代码其实等价于下面的代码。

```javascript
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError
```

上面最后一个表达式之所以会报错，是因为`x`用到默认值`y`时，`y`还没有声明。

## 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```javascript
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```javascript
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于`undefined`。

如果变量名与属性名不一致，必须写成下面这样。

```javascript
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。

```javascript
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```javascript
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

上面代码中，真正被赋值的是变量`baz`，而不是模式`foo`。

注意，采用这种写法时，变量的声明和赋值是一体的。对于`let`和`const`来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。

```javascript
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
```

上面代码中，解构赋值的变量都会重新声明，所以报错了。不过，因为`var`命令允许重新声明，所以这个错误只会在使用`let`和`const`命令时出现。如果没有第二个`let`命令，上面的代码就不会报错。

```javascript
let foo;
({foo} = {foo: 1}); // 成功

let baz;
({bar: baz} = {bar: 1}); // 成功
```

上面代码中，`let`命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。

和数组一样，解构也可以用于嵌套结构的对象。

```javascript
var obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

注意，这时`p`是模式，不是变量，因此不会被赋值。

```javascript
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc: { start: { line }} } = node;
line // 1
loc  // error: loc is undefined
start // error: start is undefined
```

上面代码中，只有`line`是变量，`loc`和`start`都是模式，不会被赋值。

下面是嵌套赋值的例子。

```javascript
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
```

对象的解构也可以指定默认值。

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x:y = 3} = {};
y // 3

var {x:y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于`undefined`。

```javascript
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

上面代码中，如果`x`属性等于`null`，就不严格相等于`undefined`，导致默认值不会生效。

如果解构失败，变量的值等于`undefined`。

```javascript
var {foo} = {bar: 'baz'};
foo // undefined
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```javascript
// 报错
var {foo: {bar}} = {baz: 'baz'};
```

上面代码中，等号左边对象的`foo`属性，对应一个子对象。该子对象的`bar`属性，解构时会报错。原因很简单，因为`foo`这时等于`undefined`，再取子属性就会报错，请看下面的代码。

```javascript
var _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错
```

如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```javascript
// 错误的写法
var x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为JavaScript引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解释为代码块，才能解决这个问题。

```javascript
// 正确的写法
({x} = {x: 1});
```

上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。

解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```javascript
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```javascript
let { log, sin, cos } = Math;
```

上面代码将`Math`对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```javascript
var arr = [1, 2, 3];
var {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

上面代码对数组进行对象解构。数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”，参见《对象的扩展》一章。

## 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

## 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

上面代码中，函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`。

下面是另一个例子。

```javascript
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

函数参数的解构也可以使用默认值。

```javascript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面代码中，函数`move`的参数是一个对象，通过对这个对象进行解构，得到变量`x`和`y`的值。如果解构失败，`x`和`y`等于默认值。

注意，下面的写法会得到不一样的结果。

```javascript
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数`move`的参数指定默认值，而不是为变量`x`和`y`指定默认值，所以会得到与前一种写法不同的结果。

`undefined`就会触发函数参数的默认值。

```javascript
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

## 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 不能使用圆括号的情况

以下三种解构赋值不得使用圆括号。

（1）变量声明语句中，不能带有圆括号。

```javascript
// 全部报错
var [(a)] = [1];

var {x: (c)} = {};
var ({x: c}) = {};
var {(x: c)} = {};
var {(x): c} = {};

var { o: ({ p: p }) } = { o: { p: 2 } };
```

上面三个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

（2）函数参数中，模式不能带有圆括号。

函数参数也属于变量声明，因此不能带有圆括号。

```javascript
// 报错
function f([(z)]) { return z; }
```

（3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。

```javascript
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

上面代码将整个模式放在圆括号之中，导致报错。

```javascript
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```

上面代码将嵌套模式的一层，放在圆括号之中，导致报错。

### 可以使用圆括号的情况

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```javascript
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。

## 用途

变量的解构赋值用途很多。

**（1）交换变量的值**

```javascript
[x, y] = [y, x];
```

上面代码交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

**（2）从函数返回多个值**

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();
```

**（3）函数参数的定义**

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

**（4）提取JSON数据**

解构赋值对提取JSON对象中的数据，尤其有用。

```javascript
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

上面代码可以快速提取JSON数据的值。

**（5）函数参数的默认值**

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

**（6）遍历Map结构**

任何部署了Iterator接口的对象，都可以用`for...of`循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

**（7）输入模块的指定方法**

加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```



# 等于

    引用：https://www.zhihu.com/question/31442029/answer/77772323

==副作用
```javascript
let x = 1;
let obj = {valueOf: function(){ x = 2; return 0 }}
console.log(obj == 0, x) // true, 2
```
==产生异常
```javascript
let x = 1;
let obj = {valueOf: function(){ return {} }, toString: function(){ return {}}}
console.log(obj == 0) // Error: Cannot convert object to primitive value
```

**结论：建议使用===，不再使用==；同理，使用!==，而尽量不使用!=**

# 原始值和引用值

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

  ​

  ```javascript
  let a = Number.POSITIVE_INFINITY;

  let b = Infinity;

  console.log(a === b); // true

  console.log(b+1); // Infinity
  ```

  ​

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



# 类型转换

* 转换成字符串
  Boolean、Number、String的原始值是伪对象，它们有属性和方法。因为它们都有 toString() 方法，可以把它们的值转换成字符串。

  ```javascript
  let s = "zero";

  console.log(s.length); // 4

  ```

  ​

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

  ```javascript
  console.log(parseInt("123zero456")); // 123

  console.log(parseInt("zero123")); // NaN

  console.log(parseInt("22.5")); // 22

  console.log(parseInt("0xF")); // 15

  console.log(parseInt("11")); // 11

  console.log(parseInt("11", 2)); // 3

  console.log(parseInt("11", 8)); // 9

  console.log(parseInt("11", 10)); // 11

  console.log(parseInt("11", 16)); // 17

  ```

  ​

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

  ```javascript
  console.log(Boolean()); // false

  console.log(Boolean('')); // false

  console.log(Boolean(null)); // false

  console.log(Boolean(undefined)); // false

  console.log(Boolean(0)); // false

  console.log(Boolean(' ')); // true

  console.log(Boolean(-1.5)); // true

  console.log(Boolean({})); // true

  ```

  ​

* Number()
  用 Number() 进行强制类型转换，"1.2.3" 将返回 NaN，因为整个字符串值不能转换成数字。如果字符串值能被完整地转换，Number() 将判断是调用 parseInt() 方法还是 parseFloat() 方法。

  ```javascript
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

  ```

  ​

* String()
  把任何值转换成字符串。

  ```javascript
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

  ```

  ​


# 分号

JavaScript语言有一个机制：在解析时，能够在一句话后面自动插入一个分号，用来修改语句末尾遗漏的分号分隔符。然而，由于这个自动插入的分号与JavaScript语言的另一个机制发生了冲突，即所有空格符都被忽略，因此程序可以利用空格格式化代码。

这两种机制的冲突，很容易掩盖更为严重的解析错误。有时会不合时宜地插入分号。例如，在return语句中自动插入分号将会导致这样的后果：如果return语句要返回一个值，这个值的表达式的开始部分必须和return在同一行上，例如：
```javascript
let f = function(){
  return
  {
    status: true
  };
};
console.log(f());
```

输出结果：
```javascript
undefined
```

看起来这里要返回一个包含status成员元素的对象。不幸的是，JavaScript自动插入分号让它返回了undefined，从而导致下面真正要返回的对象被忽略。

当自动插入分号导致程序被误解时，并不会有任何警告提醒。如果把{放在上一行的尾部而不是下一行的头部，就可以避免该问题，例如：

```javascript
let f = function(){
  return {
    status: true
  };
};

console.log(f());
```

**结论：在编写代码时，应养成使用分号结束句子的良好习惯，凡是完整的句子就应该使用分号进行分隔。分行显示的句子应该确保单行不容易形成独立的合法的逻辑语义。**



# 函数参数的默认值

ES5写法：
```javascript
function log(x) {
  x = x || 'default_value';
  console.log('x:', x);
}

log();
log(undefined);
log(null);
```
输出结果：

```javascript
x: default_value
x: default_value
x: default_value
```
ES6写法：
```javascript
function log(x = 'default_value') {
  console.log('x:', x);
}

log();
log(undefined);
log(null);
```
输出结果：
```javascript
x: default_value
x: default_value
x: null
```

* ES6的写法好处
1. 简洁直观
2. 阅读代码的人，可以立刻意识到哪些参数是可以省略的
3. 有利于将来的代码优化

* 与解构赋值默认值结合使用
```javascript
function fetch(url, { method = 'GET' } = {}) {
  console.log(method);
}

fetch('http://example.com'); // GET
```
上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。

下面两种写法有什么差别？
```javascript
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```
上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

```javascript
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
```

* 参数默认值的位置
  通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
```javascript
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
```
上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
```javascript
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```
* 函数的length属性
  指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```
上面代码中，length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。比如，上面最后一个函数，定义了3个参数，其中有一个参数c指定了默认值，因此length属性等于3减去1，最后得到2。

这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，rest参数也不会计入length属性。
```javascript
(function(...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
```javascript
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```
* 应用

```javascript
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
```



# 箭头函数

ES6允许使用“箭头”（=>）定义函数。
```javascript
let f = v => v*v;
```

上面的箭头函数等同于：
```javascript
let f = function(v) {
  return v*v;
};
```
如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
```javascript
let f = () => 5;
// 等同于
let f = function () { return 5 };

let sum = (num1, num2) => num1 + num2;
// 等同于
let sum = function(num1, num2) {
  return num1 + num2;
};
```
如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
```javascript
let sum = (num1, num2) => { return num1 + num2; }
```
由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
```javascript
let getTempItem = id => ({ id: id, name: "Temp" });
```
箭头函数可以与变量解构结合使用。
```javascript
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
```

箭头函数使得表达更加简洁。
```javascript
const isEven = n => n % 2 == 0;
const square = n => n * n;
```
箭头函数的一个用处是简化回调函数。
```javascript
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
```

另一个例子是
```javascript
// 正常函数写法
let result = values.sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
let result = values.sort((a, b) => a - b);
```
下面是rest参数与箭头函数结合的例子。
```javascript
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```


# rest参数

arguments变量的写法
```javascript
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}
```
rest参数的写法
```javascript
const sortNumbers = (...numbers) => numbers.sort();
```
rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量，如forEach。
rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
函数的length属性，不包括rest参数。

* 应用

合并数组
```javascript
let arr1 = ['a', 'b'];
let arr2 = ['c'];
let arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
与解构赋值结合
```javascript
const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

字符串

扩展运算符还可以将字符串转为真正的数组。
```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```
实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。


* 函数的length属性，不包括rest参数。




# 对象

* 定义：属性的无序集合，每个属性存放一个原始值、对象或函数。

* 对象的创建和销毁都在 JavaScript 执行过程中发生

* 声明和实例化：

  ```javascript
  let oObject = new Object();
  let oStringObject = new String();
  ```

* 如果构造函数无参数，括号则不是必需的：

  ```javascript
  let oObject = new Object;
  let oStringObject = new String;
  ```

* 对象引用：不能访问对象的物理表示，只能访问对象的引用。每次创建对象，存储在变量中的都是该对象的引用，而不是对象本身。

* 对象废除

  GC机制

  把对象的所有引用都设置为 null，可以强制性地废除对象。

* 对象作用域：只有一种作用域——公共作用域

* 开发者的规约——民间的私有属性：在属性前后加下划线，或者只在前面加下划线

  ```javascript
  obj._color_ = "blue"; // 不该访问“私有”属性_color_
  obj._color = "blue"; // 不该访问“私有”属性_color_
  ```

  ​

* this关键字：总是指向调用该方法的对象。

  ```javascript
  function showColor() {
    alert(this.color);
  };

  var oCar1 = new Object;
  oCar1.color = "red";
  oCar1.showColor = showColor;

  var oCar2 = new Object;
  oCar2.color = "blue";
  oCar2.showColor = showColor;

  oCar1.showColor();		//输出 "red"
  oCar2.showColor();		//输出 "blue"
  ```

  ​


## 定义类或对象

### 原始方式

因为对象的属性可以在对象创建后动态定义，所有许多开发者都在 JavaScript 最初引入时编写类似下面的代码：

```javascript
var oCar = new Object;
oCar.color = "blue";
oCar.doors = 4;
oCar.mpg = 25;
oCar.showColor = function() {
  alert(this.color);
};
```

缺点：可能需要创建多个 car 的实例

### 工厂方式

```javascript
function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = function() {
    alert(this.color);
  };
  return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);

oCar1.showColor();		//输出 "red"
oCar2.showColor();		//输出 "blue"
```

缺点：每次调用函数 createCar()，都要创建新函数 showColor()，意味着每个对象都有自己的 showColor() 版本。而事实上，每个对象都应该共享同一个函数。

```javascript
function showColor() {
  alert(this.color);
}

function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = showColor;
  return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);

oCar1.showColor();		//输出 "red"
oCar2.showColor();		//输出 "blue"
```

缺点：在上面这段重写的代码中，在函数 createCar() 之前定义了函数 showColor()。在 createCar() 内部，赋予对象一个指向已经存在的 showColor() 函数的指针。从功能上讲，这样解决了重复创建函数对象的问题；但是从语义上讲，该函数不太像是对象的方法。

### 构造函数方式

```javascript
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.showColor = function() {
    alert(this.color);
  };
}

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);
```

缺点：同工厂方式

### 原型方式

该方式利用了对象的 prototype 属性，可以把它看成创建新对象所依赖的原型。

这里，首先用空构造函数来设置类名。然后所有的属性和方法都被直接赋予 prototype 属性。我们重写了前面的例子，代码如下：

```javascript
function Car() {
}

Car.prototype.color = "blue";
Car.prototype.doors = 4;
Car.prototype.mpg = 25;
Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car();
var oCar2 = new Car();
```

在这段代码中，首先定义构造函数（Car），其中无任何代码。接下来的几行代码，通过给 Car 的 prototype 属性添加属性去定义 Car 对象的属性。调用 new Car() 时，原型的所有属性都被立即赋予要创建的对象，意味着所有 Car 实例存放的都是指向 showColor() 函数的指针。从语义上讲，所有属性看起来都属于一个对象，因此解决了前面两种方式存在的问题。

此外，使用这种方式，还能用 instanceof 运算符检查给定变量指向的对象的类型。

```javascript
alert(oCar1 instanceof Car);	//输出 "true"
```

原型方式看起来是个不错的解决方案。遗憾的是，它并不尽如人意。

首先，这个构造函数没有参数。使用原型方式，不能通过给构造函数传递参数来初始化属性的值，因为 Car1 和 Car2 的 color 属性都等于 "blue"，doors 属性都等于 4，mpg 属性都等于 25。这意味着必须在对象创建后才能改变属性的默认值，这点很令人讨厌，但还没完。真正的问题出现在属性指向的是对象，而不是函数时。函数共享不会造成问题，但对象却很少被多个实例共享。请思考下面的例子：

```javascript
function Car() {
}

Car.prototype.color = "blue";
Car.prototype.doors = 4;
Car.prototype.mpg = 25;
Car.prototype.drivers = new Array("Mike","John");
Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car();
var oCar2 = new Car();

oCar1.drivers.push("Bill");

alert(oCar1.drivers);	//输出 "Mike,John,Bill"
alert(oCar2.drivers);	//输出 "Mike,John,Bill"
```

上面的代码中，属性 drivers 是指向 Array 对象的指针，该数组中包含两个名字 "Mike" 和 "John"。由于 drivers 是引用值，Car 的两个实例都指向同一个数组。这意味着给 oCar1.drivers 添加值 "Bill"，在 oCar2.drivers 中也能看到。输出这两个指针中的任何一个，结果都是显示字符串 "Mike,John,Bill"。

由于创建对象时有这么多问题，你一定会想，是否有种合理的创建对象的方法呢？答案是有，需要联合使用构造函数和原型方式。

### 混合的构造函数/原型方式

联合使用构造函数和原型方式，就可像用其他程序设计语言一样创建对象。这种概念非常简单，即用构造函数定义对象的所有非函数属性，用原型方式定义对象的函数属性（方法）。结果是，所有函数都只创建一次，而每个对象都具有自己的对象属性实例。

我们重写了前面的例子，代码如下：

```javascript
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
}

Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);

oCar1.drivers.push("Bill");

alert(oCar1.drivers);	//输出 "Mike,John,Bill"
alert(oCar2.drivers);	//输出 "Mike,John"
```

现在就更像创建一般对象了。所有的非函数属性都在构造函数中创建，意味着又能够用构造函数的参数赋予属性默认值了。因为只创建 showColor() 函数的一个实例，所以没有内存浪费。此外，给 oCar1 的 drivers 数组添加 "Bill" 值，不会影响到 oCar2 的数组，所以输出这些数组的值时，oCar1.drivers 显示的是 "Mike,John,Bill"，而 oCar2.drivers 显示的是 "Mike,John"。因为使用了原型方式，所以仍然能利用 instanceof 运算符来判断对象的类型。

这种方式是 ECMAScript 采用的主要方式，它具有其他方式的特性，却没有他们的副作用。不过，有些开发者仍觉得这种方法不够完美。

### 动态原型方法

动态原型方法的基本想法与混合的构造函数/原型方式相同，即在构造函数内定义非函数属性，而函数属性则利用原型属性定义。唯一的区别是赋予对象方法的位置。下面是用动态原型方法重写的 Car 类：

```javascript
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  
  if (typeof Car._initialized == "undefined") {
    Car.prototype.showColor = function() {
      alert(this.color);
    };
	
    Car._initialized = true;
  }
}
```

直到检查 typeof Car._initialized 是否等于 "undefined" 之前，这个构造函数都未发生变化。这行代码是动态原型方法中最重要的部分。如果这个值未定义，构造函数将用原型方式继续定义对象的方法，然后把 Car._initialized 设置为 true。如果这个值定义了（它的值为 true 时，typeof 的值为 Boolean），那么就不再创建该方法。简而言之，该方法使用标志（_initialized）来判断是否已给原型赋予了任何方法。该方法只创建并赋值一次，传统的 OOP 开发者会高兴地发现，这段代码看起来更像其他语言中的类定义了。

**那么最好的解决方案是什么呢？参见ES6新特性：class关键字**

