<?php
// phucuong_api/admin_update_news.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id) || !isset($data->title) || !isset($data->excerpt) || !isset($data->content) || !isset($data->featured)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$id = intval($data->id);
$title = $conn->real_escape_string($data->title);
$excerpt = $conn->real_escape_string($data->excerpt);
$content = $conn->real_escape_string($data->content);
$featured = intval($data->featured);

// API này không xử lý upload ảnh mới, chỉ cập nhật text
$sql = "UPDATE tintuc SET title = ?, excerpt = ?, content = ?, featured = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssii", $title, $excerpt, $content, $featured, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Cập nhật tin tức thành công."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>