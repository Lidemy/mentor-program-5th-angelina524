<?php
  session_start();
  require_once('conn.php');

  if(empty($_POST['nickname'])) {
    header("Location: index.php?errCode=2");
    die('請輸入暱稱');
  }

  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  $sql = "UPDATE angelina_board_users SET nickname=? WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>
