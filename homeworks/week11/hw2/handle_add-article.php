<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');

  if(empty($_POST['title']) || empty($_POST['content'])) {
    header("Location: add-article.php?errCode=1");
    die();
  }

  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];

  $sql = "INSERT INTO angelina_blog_articles(title, category, content) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $title, $category, $content);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>