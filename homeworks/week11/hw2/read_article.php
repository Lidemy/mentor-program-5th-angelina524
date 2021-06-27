<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $id = $_GET['id'];

  $sql = "SELECT * FROM angelina_blog_articles WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
          <div class="list__title">文章</div>
            <?php while($row = $result->fetch_assoc()) { ?>
              <div class="list">
                <div class="list__info">
                  <div class="article__category"><?php echo escape($row['category'])?></div>
                  <div class="list__desc"><?php echo escape($row['title'])?></div>
                </div>
                <div class="list__time">
                  <div><?php echo escape($row['created_at'])?></div>
                  <div>
                    <?php if($username) { ?>
                      <a class="article__edit-btn" href="update_article.php?id=<?php echo $row['id']?>">編輯</a>
                      <a class="article__edit-btn" href="handle_delete-article.php?id=<?php echo $row['id']?>">刪除</a>
                    <?php } ?>
                  </div>
                </div>
              </div>
              <div class="read__article__content"><?php echo $row['content']?></div>
            <?php } ?>
        </div>
      </div>
    </main>
    <footer>
      <div>Copyright © 2021 Nana's Blog All Rights Reserved.</div>
    </footer>
  </body>
</html>
