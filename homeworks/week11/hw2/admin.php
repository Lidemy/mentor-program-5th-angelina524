<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10;
  $offset = ($page-1) * $item_per_page;

  $stmt = $conn->prepare(
    'SELECT * FROM angelina_blog_articles ' .
    'WHERE is_deleted IS NULL ' .
    'ORDER BY id DESC ' .
    'LIMIT ? OFFSET ?'
  );
  $stmt->bind_param('ii', $item_per_page, $offset);
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
        <a href="add_article.php">新增文章</a>
        <a href="handle_logout.php">登出</a>
      </div>
    </nav>
    <main>
      <div class="wrapper">
        <div class="article__list">
          <div class="list__title">管理後台</div>
          <?php while($row = $result->fetch_assoc()) { ?>
            <div class="list">
              <div class="list__info">
                <div class="article__category"><?php echo escape($row['category'])?></div>
                <div class="list__desc"><?php echo escape($row['title'])?></div>
              </div>
              <div class="list__time">
                <div><?php echo escape($row['created_at'])?></div>
                <div>
                  <a class="article__edit-btn" href="update_article.php?id=<?php echo $row['id']?>">編輯</a>
                  <a class="article__edit-btn" href="handle_delete-article.php?id=<?php echo $row['id']?>">刪除</a>
                </div>
              </div>
            </div>
          <?php } ?>
          <?php
            $sql = "SELECT COUNT(id) AS count FROM angelina_blog_articles WHERE is_deleted IS NULL";
            $stmt->prepare($sql);
            $result = $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $count = $row['count'];
            $total_page = ceil($count/$item_per_page);
          ?>
          <div class="paginator">
            <?php if($page != 1) { ?>
              <a href="list.php">第一頁</a>
              <a href="list.php?page=<?php echo $page-1?>">上一頁</a>
            <?php } ?>
            <?php if($page != $total_page) { ?>
              <a href="list.php?page=<?php echo $page+1?>">下一頁</a>
            <a href="list.php?page=<?php echo $total_page?>">最後一頁</a>
            <?php } ?>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div>Copyright © 2021 Nana's Blog All Rights Reserved.</div>
    </footer>
  </body>
</html>
