<?php
  require_once('conn.php');
  header('Content-type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  //錯誤處理：未輸入
  if(empty($_POST['site_key']) || empty($_POST['nickname']) || empty($_POST['content'])) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  $sql = "INSERT INTO angelina_discussions(site_key, nickname, content) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
  $result = $stmt->execute();

  //錯誤處理：抓不到
  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  //產生出物件
  $json = array(
    "ok" => true,
    "message" => "success"
  );

  //用 json_encode 變成 json 字串後，輸出
  $response = json_encode($json);
  echo $response;
?>