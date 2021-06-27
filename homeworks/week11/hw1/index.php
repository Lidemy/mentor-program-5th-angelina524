<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 10;
  $offset = ($page-1) * $item_per_page;

  $stmt = $conn->prepare(
    'SELECT ' .
    'C.id AS id, U.nickname AS nickname, U.username AS username, C.content AS content, C.created_at AS created_at ' .
    'FROM angelina_board_comments AS C ' .
    'LEFT JOIN angelina_board_users AS U ON C.username = U.username ' .
    'WHERE C.is_deleted IS NULL ' .
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
        <a class="btn update__nickname">編輯暱稱</a>
        <?php if(check_admin_authority($username)) { ?>
          <a class="btn" href="authority.php">後台</a>
        <?php } ?>
        <a class="btn" href="logout.php">登出</a>
      <?php } ?>
      </div>

      <!-- 留言 form -->
      <form method="POST" action="handle_add-comment.php">
        <div class="form__title">留言板</div>
        <?php if(!$username) { ?>
          <div class="form__remind">請登入發布留言</div>
        <?php } else { ?>
          <div class="form__welcome">Hello! <?php echo escape($user['nickname']); ?></div>

          <!-- 錯誤處理 -->
          <?php
            if(!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $msg = 'Error';
              if($code === '1') {
                $msg = '請輸入留言';
              } else if ($code === '2'){
                $msg = '請輸入暱稱';
              } else if ($code === '3'){
                $msg = '權限不足';
              }
              echo '<div class="form__remind">' . $msg . '</div>';
            }
          ?>

          <?php if(check_add_authority($username)) { ?>
            <textarea name="content" rows="5"></textarea>
            <input class="form__submit-btn" type="submit">
          <?php } ?>
        <?php } ?>
      </form>

      <!-- 暱稱 form -->
      <form class="hide form__update__nickname" method="POST" action="handle_update-user.php">
        <div>新暱稱：<input class="form__input" type="text" name="nickname"></div>
        <input class="form__submit-btn" type="submit">
      </form>

      <!-- 顯示留言 -->
      <section>
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
        <div class="comment">
          <div class="comment__avatar"></div>
          <div class="comment__info">
            <span class="comment__author">
              <?php echo escape($row['nickname']); ?>
              (@<?php echo escape($row['username']); ?>)
            </span>
            <span class="comment__time"><?php echo escape($row['created_at']); ?></span>
            
            <!-- 編輯 / 刪除留言 -->
            <?php if(check_edit_all_authority($username)) { ?>
              <a class="edit-btn" href="update_comment.php?id=<?php echo $row['id']?>">編輯</a>
            <?php } else if (check_edit_own_authority($username) && $row['username'] === $username) { ?>
              <a class="edit-btn" href="update_comment.php?id=<?php echo $row['id']?>">編輯</a>
            <?php } ?>

            <?php if(check_delete_all_authority($username)) { ?>
              <a class="edit-btn" href="handle_delete-comment.php?id=<?php echo $row['id']?>">刪除</a>
            <?php } else if (check_delete_own_authority($username) && $row['username'] === $username) { ?>
              <a class="edit-btn" href="handle_delete-comment.php?id=<?php echo $row['id']?>">刪除</a>
            <?php } ?>

            <div class="comment__content"><?php echo escape($row['content']); ?></div>
          </div>
        </div>
        <?php } ?>
      </section>
      <?php
        $sql = "SELECT COUNT(id) AS count FROM angelina_board_comments WHERE is_deleted IS NULL";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count/$item_per_page);
      ?>
      <div class="page">
        <div class="page-info">
          <span>總共 <?php echo $count?> 有筆留言，頁數：<?php echo $page?> / <?php echo $total_page?></span>
        </div>
        <div class="paginator">
          <?php if($page != 1) { ?>
            <a href="index.php">首頁</a>
            <a href="index.php?page=<?php echo $page-1?>">上一頁</a>
          <?php } ?>
          <?php if($page != $total_page) { ?>
            <a href="index.php?page=<?php echo $page+1?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page?>">最後一頁</a>
          <?php } ?>
        </div>
      </div>
    </main>
    <script>
      document.querySelector('.update__nickname').addEventListener('click', ()=> {
        let form = document.querySelector('.form__update__nickname')
        form.classList.toggle('hide')
      })
    </script>
  </body>
</html>
