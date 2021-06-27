<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>留言板</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="warning">
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </div>
    <main>
      <div class="board__btn">
        <a class="btn" href="index.php">回留言板</a>
        <a class="btn" href="register.php">註冊</a>
      </div>
      <form method="POST" action="handle_login.php">
        <div class="form__title">登入</div>
        <?php
          if(!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if($code === '1') {
              $msg = '資料不齊全';
            } else if ($code === '2') {
              $msg = '帳號或密碼輸入錯誤';
            }
            echo '<div class="form__remind">錯誤：' . $msg . ' </div>';
          } else {
            echo '<div class="form__remind">請輸入資料</div>';
          }
        ?>
        <div>帳號：<input class="form__input" type="text" name="username"></div>
        <div>密碼：<input class="form__input" type="password" name="password"></div>
        <input class="form__submit-btn" type="submit">
      </form>
    </main>
  </body>
</html>