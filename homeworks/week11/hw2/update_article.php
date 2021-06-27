<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');

  $id = $_GET['id'];

  $sql = "SELECT * FROM angelina_blog_articles WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>blog</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.ckeditor.com/ckeditor5/28.0.0/classic/ckeditor.js"></script>
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
        <a href="admin.php">管理後台</a>
        <a href="handle_logout.php">登出</a>
      </div>
    </nav>
    <main>
      <div class="wrapper">
        <div class="article__list">
          <div class="list__title">編輯文章</div>
          <?php
            if(!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $msg = 'Error';
              if($code === '1') {
                $msg = '請輸入資料';
              }
              echo '<div class="form__remind">錯誤：' . $msg . ' </div>';
            }
          ?>
            <form class="form__add-article" method="POST" action="handle_update-article.php">
              <select class="input__add-category" name="category">
                <option value="日常" <?php if($row['category'] === '日常') {echo 'selected';} ?>>日常</option>
                <option value="技術" <?php if($row['category'] === '技術') {echo 'selected';} ?>>技術</option>
              </select>
              <input class="input__add-title" name="title" type="text" placeholder="標題" value="<?php echo $row['title'] ?>">
              <textarea id="editor" name="content"><?php echo $row['content'] ?></textarea>
              <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
              <input class="form__submit-btn add-article-btn" type="submit" value="更新">
            </form>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div>Copyright © 2021 Nana's Blog All Rights Reserved.</div>
    </footer>
    <script>
      ClassicEditor.create(document.querySelector('#editor'), {
      })
        .then(editor => {
          console.log('Editor was initialized', editor);
        })
        .catch(err => {
          console.error(err.stack);
        });
    </script>
  </body>
</html>
