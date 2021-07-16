## Webpack 是做什麼用的？可以不用它嗎？
- webpack 是一個開源的前端打包工具
- 當程式碼越來越龐大，內容及細節越來越多時，模組的出現，幫助我們組織及管理程式碼，但是 JavaScript module 只能在 Node.js 上執行，瀏覽器並不支援，於是我們透過 webpack 將 JavaScript 的模組打包，使瀏覽器看得懂，此外還可將第三方 modules 一起打包
- Webpack 的 module 可以將各種資源視為 modules 一起打包十分方便
- 例如：
  1. css：style-loader、css-loader、less-loader、sass-loader
  2. 圖片、字體等：raw-loader、file-loader 、url-loader
  3. 幫最新最酷的語法編譯給舊的瀏覽器：babel-loader
- 使用時機：當程式碼很龐大、大型的專案、複雜的結構，就需要 webpack 模組小管家，來幫助你增加績效，反之，就不太需要

## gulp 跟 webpack 有什麼不一樣？
- gulp 是 task manager 任務小管家，比 webpack 的使用更多元，例如清空桌面、校正時間，各種任務，將要做的事情寫在 task 就可以，但 gulp 本身沒辦法打包，則需要用一些 plugin 去達成
- webpack 則是將資源一起 bundle 打包在一起，也可以將裡面的 modules 經過 loader 轉換再打包，而 webpack 沒辦法執行一些只有 gulp 才能做到的 task ( 如校正時間等 )

## CSS Selector 權重的計算方式為何？
- 權重表示：(0, 0, 0, 0)，分別為 inline style, id, class, element
- 權重高低：inline style, id > class、pseudo class、attribute > element
- id 選擇器以 # 表示：(0, 1, 0, 0)
- class 選擇器以 . 表示：(0, 0, 1, 0)
- 元素 ( div, p, li, main, footer... )：(0, 0, 0, 1)
- inline style：(1, 0, 0, 0)
### 舉例
- `.item` ⇒ (0, 0, 1, 0)
- `div.wrapper > div.list > div.item` ⇒ (0, 0, 3, 3)
- `<div style="color: orange"></div>` ⇒ (1, 0, 0, 0)
### 延伸
- 全域選擇器以 * 表示，不計算：(0, 0, 0, 0)
- !important 世界第一：(1, 0, 0, 0, 0)
