## 什麼是 MVC？
Model-View-Controller 是一種軟體的架構模式，幫助簡化開發，提高程式的可維護性，分成以下三個部分：
- Model 模型：負責管理、處理資料
- View 視圖：負責畫面處理，與使用者溝通
- Controller 控制器：model 與 view 的協調者，負責 request 與 response

### 溝通方式
- request ⇒ controller ⇒ 要 data ⇒ model ⇒ 回傳 data ⇒ controller
- controller ⇒ 傳 data ⇒ view ⇒ (template 模板 + data = response 完整的) ⇒ controller
- controller ⇒ (response) ⇒ request 送回

## 請寫下這週部署的心得
用 heroku 部署好快，就像把東西傳到 github，照著老師的影片一步一步做，也是跟著修 bug，但最後還修了一些很母湯的 bug，以下做個紀錄：
1. `heroku addons:create cleardb:ignite` ⇒ 輸入指令，噴錯
    - 發現要先綁信用卡
2. `heroku logs --tail` ⇒ 看 log ⇒ command not found: sequelize
    - package.json：sequelize cli 安裝的時候加的 --dev，所以並沒有在 dependencies 裡面，手動移進去
3. `heroku logs --tail` ⇒ 看 log ⇒ Error: Route.get() requires a callback function but got a [object Undefined] ⇒ at Object.<anonymous> (/app/index.js:52:5)
    - 去找的 index.js:52:5，發現與 /login 有關
    - 去看 controllers user 的檔案，發現我竟然註解掉 login 和 handleLogin
    - 取消註解，重新 push 就好了

### 部署步驟簡易版：
- heroku 建立帳號
- 安裝 heroku
- `git init` ⇒ 版本控制
- .gitignore 加入 node_modules ⇒ 不傳到 heroku
- 寫環境變數 index.js ⇒ `const port = process.env.PORT || 5001`
- package.json 加上

```js
"engines": {
  "node": "14.x"
},
```

- `git add .` ⇒ `git commit -m "(自行輸入)"`
- `heroku login` ⇒ 登入
- `heroku create` ⇒ create app
- `git push heroku master` ⇒ push 到 heroku
- `heroku addons:create cleardb:ignite` ⇒ 新增資料庫
- config ⇒ production 加上 `"use_env_variable": "CLEARDB_DATABASE_URL"`
- package.json ⇒ scripts 加上 ⇒

```js
"db:migrate": "npx sequelize db:migrate",
"start": "npm run db:migrate && node index.js",
```

- `git add .` ⇒ `git commit -m "(自行輸入)"`
- `git push heroku master` ⇒ push 到 heroku
- `heroku open`

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
HTML 要與 PHP 大雜燴在一起，後端要用 sql query 去與資料庫溝通，而用 express 框架寫後端，搭配 MVC，把功能分離，後端則做資料的處理，把資料丟來丟去，包一包，再丟到前端，讓前端只做渲染，資料庫甚至可以用 CLI 去溝通，解放 sql query，解放雙手～很開心自己沒有跳過 17 週的內容，學到這些發現有框架的語言，比較友善啊！