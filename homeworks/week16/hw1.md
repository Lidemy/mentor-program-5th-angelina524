## hw1：Event Loop

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

- `console.log(1)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 1
- `setTimeout(() => {console.log(2)}, 0)` ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 0ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `console.log(3)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 3
- `setTimeout(() => {console.log(4)}, 0)` ⇒ 放到 call stack 執行 ⇒ 放到 Web API 計時 0ms ⇒ call stack 執行結束 ⇒ Web API 計時結束 ⇒ 放到 callback queue 等待
- `console.log(5)` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 5
- event loop 偵測 call stack 已空 ⇒ 將 callback queue 輪流放到 call stack 執行
- `() => {console.log(2)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 2
- `() => {console.log(4)}` ⇒ 放到 call stack 執行 ⇒ call stack 執行結束 ⇒ 輸出 4
- call stack, callback queue ⇒ 清空 ⇒ 程式執行結束
- 程式碼輸出結果為：1 ⇒ 3 ⇒ 5 ⇒ 2 ⇒ 4
- 備註：
    - call stack：紀錄每個 function 執行時需要的資源及執行順序
    - Web API：瀏覽器提供的 Web API ( 瀏覽器就開另外一個 thread 執行)
    - callback queue：callback function 等待執行的排隊機制
    - event loop：不斷偵測 call stack 是否為空，如果是空的話就把 callback queue 裡面的東西丟到 call stack