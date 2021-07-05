<?php
	require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "message" => "Please send site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];

  $sql = "SELECT COUNT(id) as count FROM angelina_discussions WHERE site_key=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $site_key);
  $result = $stmt->execute();
  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    
    $response = json_encode($json);
    echo $response;
    die();
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $count = $row['count'];

  if(empty($_GET['before'])) {
    $sql = "SELECT * FROM angelina_discussions WHERE site_key=? ORDER BY id DESC LIMIT 5";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);
  } else {
    $sql = "SELECT * FROM angelina_discussions WHERE site_key=? and id < ? ORDER BY id DESC LIMIT 5";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $site_key, $_GET['before']);
  }

  $result = $stmt->execute();
  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $discussions = array();
  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions,
    "count" => $count
  );

  $response = json_encode($json);
  echo $response;
?>