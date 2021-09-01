## 為什麼我們需要 React？可以不用嗎？

### 什麼是 React？

React 是 JavaScript 開發的函式庫，用來建立使用者介面，可以透過自訂義的 components，產生 UI，components 之間以 props 溝通資訊
可以用 JSX 撰寫 React，將 UI 及邏輯拆分開來降低依賴性，程式碼也更容易開發及閱讀
使用 Virtual DOM 在資料更新時，透過 diff 演算法，比較 Virtual DOM 的差異，以 patch 方式更新節點，降低重新渲染的成本

### 為什麼需要 React？

使用 React 可以輕鬆打造可被重複利用的組件，除了提升效能，也使得程式碼更容易開發及維護，有效地建立網路應用程式

### 可以不用 React 嗎？

當專案規模不大時，可以不使用 React，使用 HTML、CSS、JavaScript 一樣可以完成，此外，也可以使用 Vue、Angular 等其他框架打造網路應用程式

## React 的思考模式跟以前的思考模式有什麼不一樣？

### React 的思考模式

React 以 components 為最小單位去拆分，每一個組件只負責一件事，像是推積木的方式，將整個網頁應用程式堆疊出來

### 以前的思考模式

以前程式碼會拆分成 HTML、CSS、JavaScript，HTML 負責網頁架構，CSS 負責視覺，JavaScript 負責動作，以職責區分，形成使用者看到的網站

## state 跟 props 的差別在哪裡？

state 與 props 都可以傳遞資料，但 props 無法改變資料，只能讀取，而 state 可以用 useState 提供的 setState 去改變資料
