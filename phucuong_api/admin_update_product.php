<?php
// phucuong_api/admin_update_product.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->id) || !isset($data->tensp) || !isset($data->gia) || !isset($data->mota) || !isset($data->danhmuc)) {
    echo json_encode(["success" => false, "message" => "Dữ liệu đầu vào không hợp lệ."]);
    exit;
}

$id = intval($data->id);
$tensp = $conn->real_escape_string($data->tensp);
$gia = floatval($data->gia); // Dùng float/decimal cho giá
$mota = $conn->real_escape_string($data->mota);
$danhmuc = $conn->real_escape_string($data->danhmuc);

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)

$sql = "UPDATE sanpham SET tensp = ?, gia = ?, mota = ?, danhmuc = ? WHERE id_sanpham = ?";
$stmt = $conn->prepare($sql);
// s (string), d (double), s (string), s (string), i (integer)
$stmt->bind_param("sdssi", $tensp, $gia, $mota, $danhmuc, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Cập nhật sản phẩm thành công."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>