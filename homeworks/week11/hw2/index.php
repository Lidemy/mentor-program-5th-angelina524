<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $stmt = $conn->prepare(
    'SELECT * FROM angelina_blog_articles ' .
    'WHERE is_deleted IS NULL ' .
    'ORDER BY id DESC ' .
    'LIMIT 5'
  );

  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }
  $result = $stmt->get_result();
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
          <a class="hide" href="register.php">註冊</a>
        <?php } else { ?>
        <a href="add_article.php">新增文章</a>
        <a href="admin.php">管理後台</a>
        <a href="handle_logout.php">登出</a>
        <?php } ?>
      </div>
    </nav>
    <div class="banner">
      <div class="banner__block"></div>
      <div class="banner__desc">Welcome to my blog</div>
    </div>
    <main>
      <div class="wrapper">
        <div class="article">
          <?php while($row = $result->fetch_assoc()) { ?>
            <div class="article__info">
              <div class="article__title">
                <?php if($username) { ?>
                  <a class="article__edit-btn" href="update_article.php?id=<?php echo $row['id']?>">編輯</a>
                <?php } ?>
                <div class="article__category"><?php echo escape($row['category'])?></div>
                <div class="article__title__desc"><?php echo escape($row['title'])?></span>
              </div>
              <div class="article__time"><?php echo escape($row['created_at'])?></div>
            </div>
            <div class="article__content"><?php echo $row['content']?></div>
            <a class="article__read-btn" href="read_article.php?id=<?php echo $row['id']?>">READ MORE</a>
          <?php } ?>
        </div>
      </div>
    </main>
    <footer>
      <div>Copyright © 2021 Nana's Blog All Rights Reserved.</div>
    </footer>
  </body>
</html>
