<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_GET['id'];

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $sql = "SELECT * FROM angelina_board_comments WHERE id=?";
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
      </div>
      <form method="POST" action="handle_update-comment.php">
        <div class="form__title">編輯留言</div>
        <div class="form__welcome">Hello! <?php echo $user['nickname']; ?></div>
        <?php
        if(!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if($code === '1') {
            $msg = '請輸入留言';
          } else if($code === '2') {
            $msg = '權限不足';
          }
          echo '<div class="form__remind">錯誤：' . $msg . ' </div>';
        }
        ?>
        <textarea name="content" rows="5"><?php echo $row['content'];?></textarea>
        <input type="hidden" name="id" value="<?php echo $row['id'];?>">
        <input class="form__submit-btn" type="submit">
      </form>
    </main>
  </body>
</html>