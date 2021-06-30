<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
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
        <?php if(!$username) { ?>
          <a href="login.php">登入</a>
        <?php } else { ?>
          <a href="add_article.php">新增文章</a>
          <a href="admin.php">管理後台</a>
          <a href="handle_logout.php">登出</a>
        <?php } ?>
      </div>
    </nav>
    <main>
      <div class="wrapper">
        <div class="article__list">
          <div class="list__title">關於我</div>
            <div class="about_me">
              <p>
                在繁重的日子裡，細細品味生活<br>
                好好吃飯、好好睡覺、好好享受風景
              </p>
              <img src="https://images.pexels.com/photos/235242/pexels-photo-235242.jpeg?cs=srgb&dl=pexels-nihat-235242.jpg&fm=jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div>Copyright © 2021 Nana's Blog All Rights Reserved.</div>
    </footer>
  </body>
</html>
