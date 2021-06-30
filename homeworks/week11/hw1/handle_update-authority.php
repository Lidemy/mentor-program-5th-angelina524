<?php
  require_once('conn.php');

  $id = $_POST['id'];
  $role = $_POST['role'];
  $add_own = intval($_POST['add_own']);
  $edit_own = intval($_POST['edit_own']);
  $delete_own = intval($_POST['delete_own']);
  $edit_all = intval($_POST['edit_all']);
  $delete_all = intval($_POST['delete_all']);

  if($role === 'admin') {
    $add_own = 1;
    $edit_own = 1;
    $delete_own = 1;
    $edit_all = 1;
    $delete_all = 1;
  } else if($role === 'normal') {
    $add_own = 1;
    $edit_own = 1;
    $delete_own = 1;
    $edit_all = 0;
    $delete_all = 0;
  } else if($role === 'suspend') {
    $edit_all = 0;
    $delete_all = 0;
  }

  $sql = "UPDATE angelina_board_authority SET role=?, add_own=?, edit_own=?, delete_own=?, edit_all=?, delete_all=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('siiiiii', $role, $add_own, $edit_own, $delete_own, $edit_all, $delete_all, $id);
  
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: authority.php")
?>
