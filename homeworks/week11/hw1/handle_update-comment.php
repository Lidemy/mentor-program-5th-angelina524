<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_POST['content'])) {
    header('Location: update_comment.php?errCode=1&id=' . $_POST['id']);
    die('請輸入留言');
  }

  $id = $_POST['id'];
  $username = $_SESSION['username'];
  $content = $_POST['content'];

  if(check_edit_all_authority($username)) {
    $sql = "UPDATE angelina_board_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else if (check_edit_own_authority($username)) {
    $sql = "UPDATE angelina_board_comments SET content=? WHERE id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }

  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>
