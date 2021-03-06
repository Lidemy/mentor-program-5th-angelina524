<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_POST['content'])) {
    header("Location: index.php?errCode=1");
    die('請輸入留言');
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];

  if(!check_add_authority($username)) {
    header("Location: index.php?errCode=3");
    die('權限不足');
  }

  $sql = "INSERT INTO angelina_board_comments(username, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>
