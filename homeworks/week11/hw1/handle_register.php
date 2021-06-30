<?php
  session_start();
	require_once('conn.php');

  if(empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: register.php?errCode=1");
    die('資料不齊全');
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO angelina_board_users(nickname, username, password) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $result = $stmt->execute();
  if(!$result) {
    $code = $conn->errno;
    if($code === 1062) {
      header("Location: register.php?errCode=2");
      die('帳號已被註冊');
    }
    die($conn->error);
  } else {
    $role = 'normal';
    $sql1 = "INSERT INTO angelina_board_authority(username, role, add_own, edit_own, delete_own, edit_all, delete_all) VALUES(?, ?, 1, 1, 1, 0, 0)";
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param('ss', $username, $role);
    $result = $stmt->execute();
  }

  $_SESSION['username'] = $username;
  header("Location: index.php");
?>
