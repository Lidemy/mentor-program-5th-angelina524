<?php
  session_start();
  require_once('check_permission.php');
?>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>blog</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <nav>
      <div class="navbar__info">
        <a class="navbar__homepage" href="index.php">Nana's Blog</a>
        <div class="navbar__options-left">
          <a href="list.php">文章列表</a>
          <a href="#">分類專區</a>
          <a href="about_me.php">關於我</a>
        </div>
      </div>
      <div class="navbar__options-right">
        <a href="login.php">登入</a>
      </div>
    </nav>
    <main>
      <form class="form__user" method="POST" action="handle_register.php">
        <div class="form__title">註冊</div>
        <?php
          if(!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if($code === '1') {
              $msg = '請輸入資料';
            } else if($code === '2') {
              $msg = '帳號已被註冊';
            }
            echo '<div class="form__remind">錯誤：' . $msg . '</div>';
          }
        ?>
        <div>帳號：<input class="input__user" name="username" type="text"></div>
        <div>密碼：<input class="input__user" name="password" type="password"></div>
        <input class="form__submit-btn" type="submit">
      </form>
    </main>
    <footer>
      <div>Copyright © 2021 Nana's Blog All Rights Reserved.</div>
    </footer>
  </body>
</html>
