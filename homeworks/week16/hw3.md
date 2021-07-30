## hw3：Hoisting

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

### 編譯階段：
- 初始化，處理宣告部分
- `var a = 1` ⇒ 宣告一個變數 a
- `function fn()` ⇒ 宣告一個函式 fn

```
globalEC: {
  VO: {
    a: undefined,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
```

### 執行階段：
- `var a = 1`
    - JS 引擎：global scope ⇒ LHS 引用 ( Left hand side 查詢變數位置以便賦值 )
    - global scope：scope 內有 ⇒ 賦值
- `fn()`
    - JS 引擎：global scope ⇒ RHS 引用 ( Right hand side 查詢變數的值以便取值 )
    - global scope：scope 內有 ⇒ 返回 fn 的值 ⇒ 呼叫 function
- 進入 fn function

```
globalEC: {
  VO: {
		a: 1,
		fn: function
  },
  scopeChain: [globalEC.VO]
}
```

### 編譯階段：
- 初始化

```
fnEC: {
  AO: {
		a: undefined,
		fn2: function
  },
	scopeChain: [fnEC.AO, fn.[[Scope]]]
						= [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
		a: 1,
		fn: function
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scope
						 = [globalEC.VO]
```

### 執行階段：
- `console.log(a)` ⇒ 輸出 undefined
    - 下一行 `var a = 5` ⇒ `var a` hoisting ⇒ 尚未賦值 ⇒ a: undefined
- `var a = 5` ⇒ fn scope ⇒ LHS 引用 ⇒ 賦值
- `console.log(a)` ⇒ 輸出 5
- `a++` ⇒ `a = 6`
- `var a` ⇒ 未賦值
- `fn2()`
    - JS 引擎：fn2 scope ⇒ RHS 引用 ( Right hand side 查詢變數的值以便取值 )
    - fn2 scope：scope 內有 ⇒ 返回 fn 的值 ⇒ 呼叫 function
- 進入 fn2 function

```
fnEC: {
  AO: {
		a: 5 => 6,
		fn2: function
  },
	scopeChain: [fnEC.AO, fn.[[Scope]]]
						= [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
		a: 1,
		fn: function
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scope
						 = [globalEC.VO]
```

### 編譯階段：
- 初始化

```
fn2: {
  AO: {
  }
  scopeChain: [fn2EC.AO, fn2.[[Scope]]]
						= [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC: {
  AO: {
		a: 6,
		fn2: function
  },
	scopeChain: [fnEC.AO, fn.[[Scope]]]
						= [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
		a: 1,
		fn: function
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scope
						 = [globalEC.VO]
```

### 執行階段：
- `console.log(a)` ⇒ 輸出 6
    - fn2EC.AO 沒有 ⇒ 透過 scopeChain ⇒ fnEC.AO 有 ⇒ `a = 6`
- `a = 20` ⇒ fn2EC.AO 沒有 ⇒ 透過 scopeChain ⇒ fnEC.AO 有 ⇒ hoisting ⇒ LHS 引用 ⇒ 賦值
- `b = 100` ⇒  fn2EC.AO 沒有 ⇒ 透過 scopeChain ⇒ fnEC.AO 沒有 ⇒ globalEC.VO 沒有 ⇒ hoisting ⇒ globalEC.VO 內宣告變數 b ⇒ LHS 引用 ⇒ 非嚴格模式下，賦值 `b = 100` ( 嚴格模式下，返回 `ReferenceError: c is not defined` )

```
fn2: {
  AO: {
  }
  scopeChain: [fn2EC.AO, fn2.[[Scope]]]
						= [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC: {
  AO: {
		a: 20,
		fn2: function
  },
	scopeChain: [fnEC.AO, fn.[[Scope]]]
						= [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
		a: 1,
		fn: function,
		b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scope
						 = [globalEC.VO]
```

- `console.log(a)` ⇒ fn2EC.AO 沒有 ⇒ 透過 scopeChain ⇒ fnEC.AO 有 ⇒ 輸出 20
- fn2 function 執行完畢 pop off

```
fnEC: {
  AO: {
		a: 20,
		fn2: function
  },
	scopeChain: [fnEC.AO, fn.[[Scope]]]
						= [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
		a: 1,
		fn: function,
		b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scope
						 = [globalEC.VO]
```

- fn function 執行完畢 pop off

```
globalEC: {
  VO: {
		a: 1,
		fn: function,
		b: 100
  },
  scopeChain: [globalEC.VO]
}
```

- `console.log(a)` ⇒ 輸出 1
- `a = 10` ⇒ LHS 引用 ⇒ 賦值

```
globalEC: {
  VO: {
		a: 10,
		fn: function,
		b: 100
  },
  scopeChain: [globalEC.VO]
}
```

- `console.log(a)` ⇒ 輸出 10
- `console.log(b)` ⇒ 輸出 100
- 程式執行結束
- 程式碼輸出結果為：undefined ⇒ 5 ⇒ 6 ⇒ 20 ⇒ 1 ⇒ 10 ⇒ 100
- 備註：
    - LHS ( Left hand side ) 引用：查詢變數位置 ⇒ 賦值
    - RHS ( Right hand side ) 引用：查詢變數的值 ⇒ 取值