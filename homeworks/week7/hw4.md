## 什麼是 DOM？
- Document Object Model 文件物件模型 ( 把一個 Document 轉換成 Object )
- DOM 是 W3C 定義網頁規則，讓不同的瀏覽器可以按這個規則去編譯網頁程式
- 瀏覽器提供橋梁，讓 JavaScript 去改變畫面上的東西
- 將 html 裡的標籤都轉化物件，形成樹狀結構，包含了各個節點(node)
- 在 DOM 中，節點分為 Document、Element、Text、Attribute

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
- DOM 事件傳遞三階段
    1. 捕獲階段 CAPTURING_PHASE
    2. 目標階段 AT_TARGET
    3. 冒泡階段 BUBBLING_PHASE
- DOM 事件傳遞從根節點開始往下，傳遞到目標，如果加上事件，就是 CAPTURING_PHASE 捕獲階段，在目標上加上 eventListener 就是 AT_TARGET，事件再往回傳遞到根節點，就是 BUBBLING_PHASE 冒泡階段。
- 在 addEventListener 時，還有第三個參數為布林值，決定在捕獲或冒泡階段監聽，
    1. false：為預設，是監聽冒泡階段
    2. true：為監聽捕獲階段

## 什麼是 event delegation，為什麼我們需要它？
- event delegation 事件代理機制，使程式更有效率，不用浪費資源去監聽每一個事件，只用一個 eventListener 來管理就好
- 例如放在父元素上，就只需要用一個 addEventListener
- 處理動態新增時，一樣可以抓到，就是 Event delegation 機制，透過冒泡機制傳到上面去，底下新增一樣可以接到事件，因為父元素都在那邊

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
- 放在 window 捕獲階段，只觸發第一個執行的事件，剩下事件皆不會觸發，讓事件不再往下傳遞

```html
window.addEventListener('click', function(e){
  e.stopPropagation()
}, true)
```

- 放 e.stopPropagation 的位置，事件就會斷在此位置上，不會繼續往下傳遞，不會傳給下一個節點，但同一個節點不只一個 listener，還是會被觸發
- 若不觸發同一個節點上的其他 listener，需使用 `e.stopImmediatePropagation()`