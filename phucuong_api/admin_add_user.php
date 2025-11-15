<?php
// phucuong_api/admin_add_user.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->username) || !isset($data->email) || !isset($data->password) || !isset($data->isAdmin)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$username = $conn->real_escape_string($data->username);
$email = $conn->real_escape_string($data->email);
$password_hash = password_hash($data->password, PASSWORD_BCRYPT); // Băm mật khẩu
$isAdmin = intval($data->isAdmin);

$sql_check = "SELECT id FROM users WHERE username = '$username' OR email = '$email'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Tên đăng nhập hoặc Email đã tồn tại."]);
} else {
    $sql_insert = "INSERT INTO users (username, email, password_hash, isAdmin) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql_insert);
    $stmt->bind_param("sssi", $username, $email, $password_hash, $isAdmin);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thêm người dùng thành công!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi máy chủ: " . $conn->error]);
    }
    $stmt->close();
}
$conn->close();
?>