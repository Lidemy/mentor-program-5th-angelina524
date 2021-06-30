<?php
  require_once('conn.php');

  function getUserFromUsername($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function check_admin_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_authority WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row['role'] === 'admin' ) {
      return true;
    } else {
      return false;
    }
  }

  function check_add_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_authority WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row['add_own'] === 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function check_edit_own_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_authority WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row['edit_own'] === 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function check_delete_own_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_authority WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row['delete_own'] === 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function check_edit_all_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_authority WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row['edit_all'] === 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function check_delete_all_authority($username) {
    global $conn;
    $sql = "SELECT * FROM angelina_board_authority WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row['delete_all'] === 1 ) {
      return true;
    } else {
      return false;
    }
  }
?>
