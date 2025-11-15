<?php
// phucuong_api/register.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->username) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$username = $conn->real_escape_string($data->username);
$email = $conn->real_escape_string($data->email);
$password_hash = password_hash($data->password, PASSWORD_BCRYPT);

$sql_check = "SELECT id FROM users WHERE username = '$username' OR email = '$email'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Tên đăng nhập hoặc Email đã tồn tại."]);
} else {
    $sql_insert = "INSERT INTO users (username, email, password_hash) VALUES ('$username', '$email', '$password_hash')";
    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(["success" => true, "message" => "Đăng ký thành công!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi máy chủ: " . $conn->error]);
    }
}
$conn->close();
?>