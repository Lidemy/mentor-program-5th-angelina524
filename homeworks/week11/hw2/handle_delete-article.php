<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');

  $id = $_GET['id'];

  $sql = "UPDATE angelina_blog_articles SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>
