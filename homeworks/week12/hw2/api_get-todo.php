<?php
	require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_GET['id'])) {
    $json = array(
      "ok" => false,
      "message" => "Please add your id in url"
    );
  
    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = $_GET['id'];

  $sql = "SELECT * FROM angelina_todoList WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
  
  $json = array(
    "ok" => true,
    "data" =>  array(
      "id" => $row['id'],
      "todoList" => $row['todo_list']
    )
  );

  $response = json_encode($json);
  echo $response;
?>