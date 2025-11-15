<?php
// phucuong_api/admin_users.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-8");

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$users = [];

if ($id) {
    // Lấy 1 user bằng ID (cho trang Sửa)
    // KHÔNG BAO GIỜ lấy password_hash ra API
    $sql = "SELECT id, username, email, isAdmin FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $users = $result->fetch_assoc();
    $stmt->close();
} else {
    // Lấy tất cả user (cho trang Danh sách)
    $sql = "SELECT id, username, email, isAdmin FROM users ORDER BY id ASC";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
}

echo json_encode($users);
$conn->close();
?>