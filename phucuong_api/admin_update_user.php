<?php
// phucuong_api/admin_update_user.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id) || !isset($data->username) || !isset($data->email) || !isset($data->isAdmin)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$id = intval($data->id);
$username = $conn->real_escape_string($data->username);
$email = $conn->real_escape_string($data->email);
$isAdmin = intval($data->isAdmin);
$password = $data->password; // Lấy mật khẩu mới (có thể rỗng)

// Kiểm tra trùng lặp email/username (loại trừ chính user này)
$sql_check = "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ssi", $username, $email, $id);
$stmt_check->execute();
if ($stmt_check->get_result()->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Tên đăng nhập hoặc Email đã bị trùng."]);
    $stmt_check->close();
    $conn->close();
    exit;
}
$stmt_check->close();

// Nếu có nhập mật khẩu mới
if (!empty($password)) {
    // Cập nhật cả mật khẩu
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $sql = "UPDATE users SET username = ?, email = ?, isAdmin = ?, password_hash = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisi", $username, $email, $isAdmin, $password_hash, $id);
} else {
    // Không cập nhật mật khẩu
    $sql = "UPDATE users SET username = ?, email = ?, isAdmin = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssii", $username, $email, $isAdmin, $id);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Cập nhật người dùng thành công."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>