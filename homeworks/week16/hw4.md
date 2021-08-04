## hw4：What is this?

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

- 物件導向中，this 指到對象，為 instance 本身，若脫離物件導向，this 則無意義
- `obj.inner.hello()` ⇒ 輸出 2
    - 用 function call 來看 `obj.inner.hello.call(obj.inner)`
    - this ⇒ `obj.inner` ⇒ `obj.inner.value = 2`
- `obj2.hello()` ⇒ 輸出 2
    - 用 function call 來看 `obj2.hello.call(obj2)` ⇒ 2
    - this ⇒ `obj2` ⇒ `obj2.value = 2`
- `hello()` ⇒ 脫離物件導向 ⇒ 嚴格模式下，undefined ( 非嚴格模式，瀏覽器下為 window，node.js 下為 global )
    - 用 function call 來看 `hello.call()` ⇒ undefined
- 程式碼輸出結果為：2 ⇒ 2 ⇒ undefined