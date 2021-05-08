## 請以自己的話解釋 API 是什麼
Application Programming Interface 應用程式介面，透過介面溝通，讓雙方交換資料。
可以分成使用 API、提供 API 的例子：
1. 取得對方資料：透過對方所提供的 API，取得資料
2. 對方取得我的資料：提供一個限制權限、限制使用方式的 API，讓對方來存取資料
3. 對方想在我這新增資料：提供給別人可以新增資料的 API
4. 想知道網路狀況：使用作業系統提供的 API，寫程式呼叫 API，了解網路狀況
5. 讀取檔案：使用作業系統提供的 API，去讀取到檔案
6. 取得臉書資料：串接臉書提供的 API，取得資料

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
HTTP Status Code 狀態碼，表明一個 http 要求是否已經被完成，主要分成五種：
1. 1 開頭為臨時回應，請求已被接受，需要繼續處理。
2. 2 開頭為成功回應，請求已成功被伺服器接收、理解、並接受。
3. 3 開頭為重新導向，需要用戶端採取進一步的操作才能完成請求。
4. 4 開頭為用戶端錯誤，妨礙了伺服器的處理。
5. 5 開頭為伺服器端錯誤，伺服器無法完成明顯有效的請求。
三個課程沒教的 HTTP status code：
1. 408 Request Timeout：請求逾時。client 端未在 sever 等待時間內完成請求傳送。
2. 409 Conflict：請求存在衝突無法處理該請求。例如多個同步編輯發生衝突。
3. 508 Loop Detected：伺服器在處理請求時陷入無窮迴圈。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
Base URL: https://letseating.lidemy.com
1. 回傳所有餐廳資料
    Method：GET
    path： /restaurant
    參數：無
2. 回傳單一餐廳資料
    Method：GET
    path：/restaurant/:id
    參數：無
3. 刪除餐廳
    Method：DELETE
    path：/restaurant/:id
    參數：無
4. 新增餐廳
    Method：POST
    path：/restaurant
    參數：name: 店名
5. 更改餐廳
    Method：PATCH
    path：/restaurant/:id
    參數：name: 店名
