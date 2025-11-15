<?php
// phucuong_api/news.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$news = [];
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $id = intval($id);
    $sql = "SELECT * FROM tintuc WHERE id = $id";
} else {
    $sql = "SELECT * FROM tintuc ORDER BY id DESC";
}

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
}

if ($id && count($news) > 0) {
    echo json_encode($news[0]); // Trả về 1 object
} else {
    echo json_encode($news); // Trả về mảng
}
$conn->close();
?>