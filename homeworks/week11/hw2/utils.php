<?php
  require_once('conn.php');

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function check_admin_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_blog_users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if(!$result) {
      return false;
    } else {
      return true;
    }
  }
?>