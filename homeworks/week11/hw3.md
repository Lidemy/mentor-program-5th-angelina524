## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### 雜湊 hash
- 雜湊是一種多對一的資料處理方式，透過 hash function 雜湊函式，將資料轉成字串，形成 hash sum 雜湊值，取代明文密碼
- `password_hash($_POST['password'], PASSWORD_DEFAULT)` 儲存時：密碼經過 hash
- `password_verify($password, $row['password'])` 登入時：密碼經過 hash，並比對資料庫

### 為什麼密碼要雜湊過後才存入資料庫
- 當駭客取得主機資料，也無法取得原始密碼

### 加密與雜湊的差異
- 明文密碼加密後，會有密文、密鑰，透過密文、密鑰，可以逆推原本的明文內容，而雜湊不行

## `include`、`require`、`include_once`、`require_once` 的差別
### include 與 include_once
- 將指定的檔案讀入並且執行裡面的程式
- 引入的檔案檔儲存位置錯誤或不存在時，會先產生警告訊息、忽略錯誤並繼續進行
- include_once 會防止重複引入檔案，先檢查檔案內容是否匯入過，若有則不會重複匯入內容

### require 與 require_once
- 在 PHP 執行前，將檔案引入到程式碼中
- 引入的檔案檔儲存位置錯誤或不存在時，會顯示錯誤並停止程式的執行
- require_once 會防止重複引入檔案，先檢查檔案內容是否匯入過，若有則不會重複匯入內容

## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
- SQL Injection 駭客的填字遊戲，將惡意構造的字串，injection 注入到 SQL query 當中
- 例如：惡意塞入多個 values 到 INSERT query 中，或以絕對為 true 的條件放到 WHERE，利用 SELECT query 將資料庫內資料都拿出來等等

### 防範方法
- 以 Prepared statement 參數化查詢為防範方法，與資料庫連結並存取資料時，將 SQL query 中填入數值或資料的位置，都以 parameter 參數代替，目前已被視為最有效可預防 SQL Injection 攻擊的防禦方式

##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
- Cross-site Scripting 跨網站指令碼是一種網站應用程式的安全漏洞攻擊，惡意使用者將程式碼注入到網頁上，其他使用者在觀看網頁時就會受到影響

### 防範方法
- 以 htmlspecialchars 為防範方法，用來轉換 HTML 特殊符號為僅能顯示用的編碼，跳脫內容只顯是在畫面，不存到資料庫
- `htmlspecialchars(內容, ENT_QUOTES)` 將字元跳脫
```php
function escape($str) {
	return htmlspecialchars($str, ENT_QUOTES)
}
```
- 將需要顯示的內容，進行 `escape(內容)` 跳脫輸出

## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
- Cross Site Request Forgery 跨站請求偽造是一種 Web 上的攻擊手法，與 XSS 不同，又可稱作 one-click attack，即使在不同的 domain 下點擊某個惡意連結，可進行偽造本人的請求並達成，因瀏覽器機制會將關聯的 cookie 帶上，若使用者為登入狀態，request 則包含使用者訊息。

### 防範方法
- Client 端：
    - 網站使用完後，就登出
- Server 端：
    - 加上圖形驗證碼、簡訊驗證碼：多一道檢查確保擋掉 CSRF 的攻擊
    - 加上 CSRF token：以 form submit 時帶上 csrftoken 隱藏欄位，值由 server 產生的，並放在 session 中，使用者發送 request 時，sever 端會比對表單 csrftoken 與 session 存的是否相同，而攻擊者無法知道 csrftoken 的值，不能進行攻擊
    - Double Submit Cookie：不需要像 CSRF token 將資料存在 server 端 的 session，由 client 產生，放在 form 的 csrftoken 及寫入 cookie，使用者發送 request 時，sever 端會檢查 cookie 及 form 中的 csrftoken 是否相同，以確認是否來自相同 domain