<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');

  if(empty($_POST['title']) || empty($_POST['content'])) {
    header("Location: update-article.php?errCode=1&id=" . $_GET['id']);
    die();
  }

  $id = $_POST['id'];
  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];

  
  $sql = "UPDATE angelina_blog_articles SET title=?, category=?, content=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssi', $title, $category, $content, $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: read_article.php?id=" . $id);
?>