## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. <textarea></textarea>：表單多行文字輸入區域
  `<textarea name="" id="" cols="30" rows="10"></textarea>`
  cols 為行數、rows 為列數
2. <select></select>：選單，單選或複選都可以
  `<select name="" id=""></select>`
3. `<option>選項</option>`：建立 select 標籤內的選項
[參考資料](http://web.thu.edu.tw/hzed/www/tag.htm)

## 請問什麼是盒模型（box modal）
- 將 HTML 裡的元素視為每一個盒子，並利用 CSS 來調整屬性
- 盒模型由 content、padding、border、margin 所組成
- 內到外包含：
    1. 元素內容 content：以 width、height 調整大小
    2. 內邊距 padding：content 與 border 之間的範圍
    3. 邊距 border：將 content、padding 包起來
    4. 外邊距 margin：與其他元素之間的空白距離
- 元素在視覺上所佔用的空間為 width + height + padding + border
- 撰寫方式可設定 1 至 4 個值，值的單位可為 px、%、em、rem
    1. 1 個值：上下左右
    2. 2 個值：上下、左右
    3. 3 個值：上、左右、下
    4. 4 個值：上、下、左、右
- box-sizing 顯示模式：
    1. `box-sizing: content-box` 為預設，保留原始寬高，為 content 寬高
        顯示 width 100 px = content width 100 px
    2. `box-sizing: border-box` 會調整 content 寬高，會扣除 padding、border
        顯示 width 100 px = content 100-30 px + padding 上下 10 px + border 上下 5px
[參考資料]([https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model))

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
### display
- 設定元素與相鄰元素關係、內部元素的排列

### inline
- 預設為 inline：span、a
- 不能調整寬高，依據內容大小顯示
- 不能調整上下邊距：margin 只會改變左右、padding 位置不變，但上下會被撐開
- 適用：元素排在同一行，排不下才換行
- `display: inline`

### block
- 預設為 block：div、h1、p
- 調整什麼屬性都可以，例如：padding、margin、width、height 等
- 適用：元素佔滿一整行，由上到下排列，每個元素都是新的一行
- `display: block`

### inline-block
- 預設為 inline-block：button、input、select
- 對外像 inline 可併排，對內像 block 可調各種屬性
- 適用：要併排，又要調屬性，小孩子才做選擇
- `display: inline-block`

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
### position
- 設定元素為絕對定位、相對定位、相對於哪裡排版

### static
- 未設置 position，預設值為 static
- 網頁預設定位方式，按照順序排下去
- 適用：順著排版流、不以特殊位置來排列、預設狀態

### relative
- 相對定位 `position: relative`
- 針對自己原本的位置做定位
- 只會改變自己的位置
- 適用：順著排版流、以原本的位置為原點，來移動

### absolute
- 絕對定位 `position: absolute`
- 針對某個參考點 ( 往上找，第一個不是 static 預設的元素 ) 而定位
    例如： `position: relative`
- 從正常的排版流程裡面抽出去，下一個元素會自動遞補
- 若不設定參考點，元素會根據 body 來定位
- 適用：跳脫排版流、以特定元素為原點 ( 如：上層元素 )，來移動

### fixed
- 固定定位 `position: fixed`
- 相對於 viewport ( 瀏覽器看得到的地方 ) 做定位，畫面滑動不會改變位置
- 適用：跳脫排版流、以視窗為原點，來移動
