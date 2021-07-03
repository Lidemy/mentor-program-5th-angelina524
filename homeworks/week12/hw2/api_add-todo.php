<?php
	require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_POST['todoList'])) {
    $json = array(
      "ok" => false,
      "message" => "Please input something cool"
    );
  
    $response = json_encode($json);
    echo $response;
    die();
  }

  $todoList = $_POST['todoList'];

  $sql = "INSERT INTO angelina_todoList(todo_list) VALUES(?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $todoList);
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

  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $conn->insert_id
  );

  $response = json_encode($json);
  echo $response;
?>