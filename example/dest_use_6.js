'use strict';


let map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

for (let [key] of map) {
  console.log('key:', key);
}

for (let [key, ] of map) {
  console.log('key:', key);
}

for (let [, value] of map) {
  console.log('value:', value);
}
