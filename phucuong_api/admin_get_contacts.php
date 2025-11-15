<?php
// phucuong_api/admin_get_contacts.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-8");

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)

$messages = [];
// Sắp xếp tin mới nhất lên đầu
$sql = "SELECT * FROM lienhe ORDER BY ngaygui DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

echo json_encode($messages);
$conn->close();
?>