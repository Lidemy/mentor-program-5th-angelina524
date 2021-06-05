## 什麼是 Ajax？
- Asynchronous JavaScript And XML 在瀏覽器上發送 request
- 同步與非同步的差異：
    1. Asynchronous 非同步：client 送 request 到 server，不需要等待 response，可以持續處理其他事，response 回來會被融合進當下頁面或應用中。
    2. Synchronous 同步：client 送 request 到 server，需要等待 response 回來，才能繼續下一步動作，等待時不能做其他事。

## 用 Ajax 與我們用表單送出資料的差別在哪？
- 表單：表單送出後，一定會換頁，自動導向到新頁面，透過 server response，render 到頁面，不需要透過程式碼，而是根據表單結構自動完成
- Ajax：表單送出後，頁面不會跳轉，需要透過 JavaScript 操作頁面跳轉、數據變化，也可進行後續的非同步操作

## JSONP 是什麼？
- JSON with Padding，跨來源請求
- 透過 <script> 標籤不受同源限制規範，利用 JavaScript 方式取得資料
- <script> 裡面放資料，可以動態產生，response 為 JavaScript object 資料，在 server 填充資料，透過指定好的 function 把資料帶回去
- 缺點：參數永遠只能用附加在網址上的方式 GET 帶過去，沒辦法用 POST

## 要如何存取跨網域的 API？
- 瀏覽器受到 Same origin policy 同源政策影響，存取跨網域 API 時，需要相同 domain 網域、相同 http 或 https 協定、相同 port 埠號、相同主機位置等等，瀏覽器預設是會把不同源給擋掉，所以不會讓 JavaScript 拿到結果並回傳錯誤
- 這時候就需要 Cross-Origin Resource Sharing ( CORS ) 跨來源資源共用，以取得不同源的資料
- CORS 使用：
    1. request header 加上 Access-Control-Allow-Origin，哪些來源的人可以存取 API Response
    2. 也可以用 Access-Control-Allow-Headers 定義，接受哪些 request header
    3. 或 Access-Control-Allow-Method 定義接受哪些 Method
    4. 當瀏覽器接收到，符合規則並驗證通過時，便允許接受跨來源請求的回應
    5. 若想發起跨來源請求並順利收到回應，要確保 server 端有加上 Access-Control-Allow-Origin，不然會被瀏覽器擋掉並顯示錯誤訊息
    6. 例如：`Access-Control-Allow-Origin: *` 表示所有的 origin 都可以存取 ( * 為萬用字元 )

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
- 第四週使用 Node.js 程式：Node.js → 作業系統 → 發 request → server ( 使用 request library )
- 第八週使用瀏覽器 JavaScript：JavaScript → 瀏覽器 → 作業系統 → 發 request → server → 瀏覽器 → 送 response 回來
- 過程中多了瀏覽器關卡，瀏覽器會阻止做某些事或加一些額外資訊，最重要是會受同源政策影響，而 Node.js 不受限制
