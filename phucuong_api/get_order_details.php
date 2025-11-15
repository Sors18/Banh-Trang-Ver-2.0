<?php
// phucuong_api/get_order_details.php
include 'db.php'; // File này đã có các header CORS
header("Content-Type: application/json; charset=UTF-8");

$order_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0; // Để bảo mật

if ($order_id == 0 || $user_id == 0) {
    echo json_encode(["success" => false, "message" => "Yêu cầu không hợp lệ."]);
    exit;
}

// 1. Lấy thông tin cơ bản của đơn hàng VÀ kiểm tra xem có đúng của user_id này không
$order_info = null;
$sql_order = "SELECT * FROM orders WHERE id_donhang = ? AND user_id = ?";
$stmt_order = $conn->prepare($sql_order);
$stmt_order->bind_param("ii", $order_id, $user_id);
$stmt_order->execute();
$result_order = $stmt_order->get_result();

if ($result_order->num_rows == 0) {
    echo json_encode(["success" => false, "message" => "Không tìm thấy đơn hàng hoặc bạn không có quyền xem."]);
    $stmt_order->close();
    $conn->close();
    exit;
}
$order_info = $result_order->fetch_assoc();
$stmt_order->close();

// 2. Lấy các sản phẩm trong đơn hàng (JOIN với 'sanpham' để lấy 'hinhanh')
$items = [];
// Lấy các sản phẩm từ bảng 'order_items'
$sql_items = "SELECT oi.*, p.hinhanh 
              FROM order_items oi
              JOIN sanpham p ON oi.product_id = p.id_sanpham
              WHERE oi.order_id = ?";
$stmt_items = $conn->prepare($sql_items);
$stmt_items->bind_param("i", $order_id);
$stmt_items->execute();
$result_items = $stmt_items->get_result();

while($row = $result_items->fetch_assoc()) {
    $items[] = $row;
}
$stmt_items->close();

// 3. Gộp lại và trả về
$response = [
    "success" => true,
    "order_details" => $order_info,
    "order_items" => $items
];

echo json_encode($response);
$conn->close();
?>