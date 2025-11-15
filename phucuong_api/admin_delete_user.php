<?php
// phucuong_api/admin_delete_user.php
include 'db.php'; 
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id)) {
    echo json_encode(["success" => false, "message" => "ID không hợp lệ."]);
    exit;
}
$id = intval($data->id);

// Thêm một lớp bảo vệ: Không cho phép xóa user có ID = 1 (super admin)
if ($id == 1) {
    echo json_encode(["success" => false, "message" => "Không thể xóa Super Admin."]);
    exit;
}

$sql = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Xóa người dùng thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không tìm thấy người dùng để xóa."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}
$stmt->close();
$conn->close();
?>