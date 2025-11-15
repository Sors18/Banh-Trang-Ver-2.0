<?php
// phucuong_api/admin_update_order_status.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->order_id) || !isset($data->new_status)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$order_id = intval($data->order_id);
$new_status = $conn->real_escape_string($data->new_status); // Ví dụ: 'Đang vận chuyển', 'Hoàn thành', 'Đã hủy'

// (Trong dự án thật, bạn nên kiểm tra xem người gọi có phải là admin không)

$sql = "UPDATE orders SET trangthai = ? WHERE id_donhang = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $new_status, $order_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Cập nhật trạng thái thành công."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>