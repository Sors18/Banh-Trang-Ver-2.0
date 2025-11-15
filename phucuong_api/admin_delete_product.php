<?php
// phucuong_api/admin_delete_product.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id)) {
    echo json_encode(["success" => false, "message" => "ID sản phẩm không hợp lệ."]);
    exit;
}

$id = intval($data->id);

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)
// (Cũng nên kiểm tra xem sản phẩm có trong 'order_items' không trước khi xóa)

$sql = "DELETE FROM sanpham WHERE id_sanpham = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Xóa sản phẩm thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không tìm thấy sản phẩm để xóa."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>