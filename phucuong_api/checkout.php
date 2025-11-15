<?php
// phucuong_api/checkout.php
include 'db.php'; // File này phải chứa các header CORS

// Đảm bảo db.php đã có header, nhưng thêm ở đây cho chắc chắn
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->customerInfo) || !isset($data->cartItems) || empty($data->cartItems)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

// Lấy thông tin
$info = $data->customerInfo;
$cart = $data->cartItems;
$userId = isset($data->userId) ? $data->userId : null;

$hoten = $conn->real_escape_string($info->hoten);
$diachi = $conn->real_escape_string($info->diachi);
$sdt = $conn->real_escape_string($info->sdt);

// Tính tổng tiền
$tongtien = 0;
foreach ($cart as $item) {
    if (is_object($item)) {
      $tongtien += $item->gia * $item->quantity;
    }
}

// Bắt đầu Transaction
$conn->begin_transaction();

try {
    // 1. Thêm vào bảng `orders`
    $sql_order = "";
    if ($userId) {
        $sql_order = "INSERT INTO orders (user_id, hoten, diachi, sdt, tongtien) VALUES (?, ?, ?, ?, ?)";
        $stmt_order = $conn->prepare($sql_order);
        $stmt_order->bind_param("isssd", $userId, $hoten, $diachi, $sdt, $tongtien);
    } else {
        $sql_order = "INSERT INTO orders (hoten, diachi, sdt, tongtien) VALUES (?, ?, ?, ?)";
        $stmt_order = $conn->prepare($sql_order);
        $stmt_order->bind_param("sssd", $hoten, $diachi, $sdt, $tongtien);
    }
    
    $stmt_order->execute();
    $order_id = $conn->insert_id; // Lấy ID của đơn hàng vừa tạo

    // 2. Thêm vào bảng `order_items`
    $sql_items = "INSERT INTO order_items (order_id, product_id, tensp, soluong, gia_luc_mua) VALUES (?, ?, ?, ?, ?)";
    $stmt_items = $conn->prepare($sql_items);

    foreach ($cart as $item) {
      if (is_object($item)) {
        $stmt_items->bind_param("iisid", $order_id, $item->id_sanpham, $item->tensp, $item->quantity, $item->gia);
        $stmt_items->execute();
      }
    }

    // Hoàn thành
    $conn->commit();
    echo json_encode(["success" => true, "message" => "Đặt hàng thành công!", "orderId" => $order_id]);

} catch (Exception $e) {
    // Nếu có lỗi, hủy bỏ mọi thay đổi
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Lỗi khi xử lý đơn hàng: " . $e->getMessage()]);
}

$stmt_order->close();
if (isset($stmt_items)) $stmt_items->close();
$conn->close();
?>