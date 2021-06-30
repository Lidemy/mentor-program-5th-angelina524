<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(!check_admin_authority($_SESSION['username'])) {
    header("Location: index.php");
    die();
  }

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 10;
  $offset = ($page-1) * $item_per_page;

  $stmt = $conn->prepare(
    'SELECT ' .
    'A.id AS id, U.username AS username, A.role as role, A.add_own as add_own, A.edit_own as edit_own, A.delete_own as delete_own, A.edit_all as edit_all, A.delete_all as delete_all ' .
    'FROM angelina_board_authority AS A ' .
    'LEFT JOIN angelina_board_users AS U ON A.username = U.username ' .
    'ORDER BY username ASC ' .
    'LIMIT ? OFFSET ?'
  );
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>留言板</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="warning">
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </div>
    <main class="table">
      <div class="board__btn">
        <a class="btn" href="index.php">回留言板</a>
        <a class="btn" href="logout.php">登出</a>
      </div>
    </main>
    <section class="authority__table">
      <div class="table__title">權限管理</div>
      <table>
        <tr>
          <th>使用者名稱</th>
          <th>權限身份</th>
          <th>新增文章</th>
          <th>編輯<br>自己文章</th>
          <th>刪除<br>自己文章</th>
          <th>編輯<br>任意文章</th>
          <th>刪除<br>任意文章</th>
          <th>更新</th>
        </tr>
        <?php while($row = $result->fetch_assoc()) { ?>
          <tr>
            <form method="POST" action="handle_update-authority.php">
              <td>
                <?php echo escape($row['username'])?>
              </td>
              <td>
                <select name="role" size="1">
                  <option value="admin" <?php if($row['role'] === 'admin') {echo 'selected';}?>>管理員</option>
                  <option value="normal" <?php if($row['role'] === 'normal') {echo 'selected';}?>>使用者</option>
                  <option value="suspend" <?php if($row['role'] === 'suspend') {echo 'selected';}?>>停權者</option>
                  <option value="editor" <?php if($row['role'] === 'editor') {echo 'selected';}?>>編輯者</option>
                </select>
              </td>
              <td>
                <?php if($row['role'] === 'editor') { ?>
                  <select name="add_own">
                    <option value="1" <?php if($row['add_own'] === 1) {echo 'selected';} ?>>Y</option>
                    <option value="0" <?php if($row['add_own'] === 0) {echo 'selected';} ?>>N</option>
                  </select>
                <?php } ?>
              </td>
              <td>
                <?php if($row['role'] === 'suspend'|| $row['role'] === 'editor') { ?>
                  <select name="edit_own" size="1">
                    <option value="1" <?php if($row['edit_own'] === 1) {echo 'selected';} ?>>Y</option>
                    <option value="0" <?php if($row['edit_own'] === 0) {echo 'selected';} ?>>N</option>
                  </select>
                <?php } ?>
              </td>
              <td>
                <?php if($row['role'] === 'suspend'|| $row['role'] === 'editor') { ?>
                  <select name="delete_own" size="1">
                    <option value="1" <?php if($row['delete_own'] === 1) {echo 'selected';} ?>>Y</option>
                    <option value="0" <?php if($row['delete_own'] === 0) {echo 'selected';} ?>>N</option>
                  </select>
                <?php } ?>
              </td>
              <td>
                <?php if($row['role'] === 'editor') { ?>
                  <select name="edit_all" size="1">
                    <option value="1" <?php if($row['edit_all'] === 1) {echo 'selected';} ?>>Y</option>
                    <option value="0" <?php if($row['edit_all'] === 0) {echo 'selected';} ?>>N</option>
                  </select>
                <?php } ?>
              </td>
              <td>
                <?php if($row['role'] === 'editor') { ?>
                  <select name="delete_all" size="1">
                    <option value="1" <?php if($row['delete_all'] === 1) {echo 'selected';} ?>>Y</option>
                    <option value="0" <?php if($row['delete_all'] === 0) {echo 'selected';} ?>>N</option>
                  </select>
                <?php } ?>
              </td>
              <td>
                <input type="hidden" name="id" value="<?php echo $row['id']?>">
                <input class="table__submit-btn" type="submit" value="更新">
              </td>
            </form>
          </tr>
        <?php } ?>
      </table>
    </section>
    <?php
        $sql = "SELECT COUNT(id) AS count FROM angelina_board_authority";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count/$item_per_page);
      ?>
      <div class="page">
        <div class="page-info">
          <span>總共 <?php echo $count?> 有筆資料，頁數：<?php echo $page?> / <?php echo $total_page?></span>
        </div>
        <div class="paginator">
          <?php if($page != 1) { ?>
            <a href="authority.php">第一頁</a>
            <a href="authority.php?page=<?php echo $page-1?>">上一頁</a>
          <?php } ?>
          <?php if($page != $total_page) { ?>
            <a href="authority.php?page=<?php echo $page+1?>">下一頁</a>
          <a href="authority.php?page=<?php echo $total_page?>">最後一頁</a>
          <?php } ?>
        </div>
      </div>
  </body>
</html>
