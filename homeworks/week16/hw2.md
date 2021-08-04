## w2：Event Loop + Scope

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

- 進入迴圈
- 宣告全域變數 i，賦值 i = 0，i < 5，每一圈 i + 1
- `console.log('i: ' + i)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 i: 0
- `setTimeout(() => {console.log(i)}, i * 1000)` ⇒ ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 1000ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `i++` ⇒ `i = 1`
- `console.log('i: ' + i)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 i: 1
- `setTimeout(() => {console.log(i)}, i * 1000)` ⇒ ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 1000ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `i++` ⇒ `i = 2`
- `console.log('i: ' + i)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 i: 2
- `setTimeout(() => {console.log(i)}, i * 1000)` ⇒ ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 1000ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `i++` ⇒ `i = 3`
- `console.log('i: ' + i)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 i: 3
- `setTimeout(() => {console.log(i)}, i * 1000)` ⇒ ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 1000ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `i++` ⇒ `i = 4`
- `console.log('i: ' + i)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 i: 4
- `setTimeout(() => {console.log(i)}, i * 1000)` ⇒ ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 1000ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `i++` ⇒ `i = 5` ⇒ 迴圈結束
- event loop 偵測 call stack 已空 ⇒ 將 callback queue 輪流放到 call stack 執行
- `() => {console.log(i)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 5
- `() => {console.log(i)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 5
- `() => {console.log(i)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 5
- `() => {console.log(i)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 5
- `() => {console.log(i)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 5
- call stack, callback queue ⇒ 清空 ⇒ 程式執行結束
- 程式碼輸出結果為：i: 0 ⇒ i: 1 ⇒ i: 2 ⇒ i: 3 ⇒ i: 4 ⇒ 5 ⇒ 5 ⇒ 5 ⇒ 5 ⇒ 5