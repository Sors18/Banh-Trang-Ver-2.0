<?php
// phucuong_api/login.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->username) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$username = $conn->real_escape_string($data->username);
$password = $data->password;

$sql = "SELECT * FROM users WHERE username = '$username'"; // SỬA: Dùng bảng 'users'
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    if (password_verify($password, $row['password_hash'])) {
        // Đăng nhập thành công
        $user_data = [
            "id" => $row['id'], // SỬA: Dùng 'id'
            "username" => $row['username'],
            "email" => $row['email'],
            "isAdmin" => $row['isAdmin'] // <-- THÊM DÒNG NÀY
        ];
        echo json_encode(["success" => true, "message" => "Đăng nhập thành công!", "user" => $user_data]);
    } else {
        echo json_encode(["success" => false, "message" => "Sai tên đăng nhập hoặc mật khẩu."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Sai tên đăng nhập hoặc mật khẩu."]);
}
$conn->close();
?>