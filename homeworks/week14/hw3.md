## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
Domain Name System 網域名稱系統，將 Domain name 與 IP address 相互之間的轉換的一個分散式資料庫，方便人們使用及管理，不需要輸入 91.0.4472.114 難記的 IP address， 輸入方便又好記的 google.com 網域名稱，DNS 會幫助我們轉成電腦看得懂的 IP address，就可以連到正確的位置

### Google Public DNS
- 透過 Google Public DNS 造訪網站，可以讓 Google 蒐集人們的造訪的網頁，優化搜尋引擎及廣告投放
- 讓 Client 端加速瀏覽體驗、提升網路安全、直接取得 DNS 查詢結果參考資料

### 參考資料
- [使用 Google Public DNS 服務，上網速度不一定會變快！](https://blog.miniasp.com/post/2009/12/08/Use-Google-Public-DNS-may-not-surfing-faster-as-you-expected)

## 什麼是資料庫的 lock？為什麼我們需要 lock？
當搶購時，多筆 transaction 發生，為確保資料的正確性，解決 race condition 競爭危害，會使用 lock 將資料鎖起來，避免同時存取同一筆資料，可以指定 row lock，未指定則為 table lock
- 例如將 id = 1 鎖起來，update 後再繼續下一步

```php
$conn->autocommit(false)
$conn->begin_transaction()
$conn->query("SELECT amount FROM products WHERE id = 1 for update")
$conn->commit()
```

## NoSQL 跟 SQL 的差別在哪裡？
兩者以不同方式操作，達成儲存資料的相同目的，依照專案需求選擇，而 NoSQL 為 Not Only SQL，是一種非關聯式資料庫，以 key-value 的方式儲存資料，如 JSON 格式，使用特定的函式操作，沒有 Schema 並且不支援 JOIN，常用於存大量資料，及一些結構不固定的資料，如事件記錄、購物車資訊等

## 資料庫的 ACID 是什麼？
為了保證 transaction 的正確性，要以下符合四個特性

### 原子性 atomicity
一筆 transaction 中所有的操作，只會全部失敗或是全部成功，也不會中間結束，發生錯誤則會回到 transaction 開始之前的狀態，表示 transaction 的不可分割性

### 一致性 consistency
transaction 開始前到結束，維持資料的一致性、完整性

### 隔離性 isolation
多筆 transaction 對資料進行 CRUD，防止 transaction 不會互相影響，例如不能同時修改同一筆資料

### 持久性 durability
transaction 成功後，CRUD 後的資料不會不見，即使系統故障也不會