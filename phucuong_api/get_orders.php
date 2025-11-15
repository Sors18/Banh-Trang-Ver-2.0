<?php
// phucuong_api/get_orders.php
include 'db.php'; // File này đã có các header CORS
header("Content-Type: application/json; charset=UTF-8");

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id == 0) {
    echo json_encode(["success" => false, "message" => "Yêu cầu đăng nhập."]);
    exit;
}

$orders = [];
// SỬA: Lấy tất cả các cột cần thiết
$sql = "SELECT id_donhang, hoten, diachi, sdt, tongtien, trangthai, ngaytao 
        FROM orders 
        WHERE user_id = ? 
        ORDER BY ngaytao DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders); // Trả về mảng các đơn hàng

$stmt->close();
$conn->close();
?>