<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $result = $conn->query("SELECT * FROM angelina_board_comments ORDER BY id DESC");
  if(!$result) {
    die('Error' . $conn->error);
  }
?>
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
      <!-- 按鈕 -->
      <div class="board__btn">
      <?php if(!$username) { ?>
          <a class="btn" href="register.php">註冊</a>
          <a class="btn" href="login.php">登入</a>
      <?php } else { ?>
          <a class="btn" href="logout.php">登出</a>
      <?php } ?>
      </div>

      <!-- form -->
      <form method="POST" action="handle_add-comment.php">
        <div class="form__title">留言板</div>
        <?php if(!$username) { ?>
          <div class="form__remind">請登入發布留言</div>
        <?php } else { ?>
          <div class="form__welcome">Hello! <?php echo $username; ?></div>

          <!-- 未輸入留言 -->
          <?php
            if(!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $msg = 'Error';
              if($code === '1') {
                $msg = '請輸入留言';
              }
              echo '<div class="form__remind">' . $msg . '</div>';
            }
          ?>
          <textarea name="content" rows="5"></textarea>
          <input class="form__submit-btn" type="submit">
        <?php } ?>
      </form>

      <!-- 顯示留言 -->
      <section>
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
        <div class="comment">
          <div class="comment__avatar"></div>
          <div class="comment__info">
            <span class="comment__author"><?php echo $row['nickname']; ?></span>
            <span class="comment__time"><?php echo $row['created_at']; ?></span>
            <div class="comment__content"><?php echo $row['content']; ?></div>
          </div>
        </div>
        <?php } ?>
      </section>
    </main>
  </body>
</html>