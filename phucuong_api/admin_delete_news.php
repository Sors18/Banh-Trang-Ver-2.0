<?php
// phucuong_api/admin_delete_news.php
include 'db.php'; 
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id)) {
    echo json_encode(["success" => false, "message" => "ID không hợp lệ."]);
    exit;
}
$id = intval($data->id);

$sql = "DELETE FROM tintuc WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Xóa tin tức thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không tìm thấy tin tức để xóa."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}
$stmt->close();
$conn->close();
?>