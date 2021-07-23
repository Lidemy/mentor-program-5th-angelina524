## hw1：短網址系統設計

[架構圖](https://i.imgur.com/wS3oFvZ.png)

### 為什麼需要短網址
相較於長網址，短網址更容易顯示、記憶、分享、散佈，使用者輸入也較不會出錯，甚至隱藏關聯的 URL

### 短網址設計
- 給長網址一個足夠短短且獨一的短網址
- 當使用者透過短網址發送 Reuqest，需為其導向至原始網址
- 使用者可以自行定義短網址、到期時間
- 增加系統的可用性，避免服務失敗
- 提升效能，以最小延遲，將使用者導向至原始網址
- 為避免惡意爛用，限制用戶新增數量及重新導向次數

### 參考資料
- [25 Software Design Interview Questions to Crack Any Programming and Technical Interviews](https://medium.com/javarevisited/25-software-design-interview-questions-to-crack-any-programming-and-technical-interviews-4b8237942db0)
- [Designing a URL Shortening service like TinyURL](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR)
- [系統設計101—大型系統的演進（上）](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/backend-architecture-101-5c425e760a13)