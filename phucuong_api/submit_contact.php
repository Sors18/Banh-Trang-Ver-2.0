<?php
// phucuong_api/submit_contact.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->hoten) || !isset($data->sdt) || !isset($data->nhahang)) {
    echo json_encode(["success" => false, "message" => "Thiếu thông tin bắt buộc."]);
    exit;
}

$hoten = $conn->real_escape_string($data->hoten);
$sdt = $conn->real_escape_string($data->sdt);
$email = $conn->real_escape_string($data->email);
$nhahang = $conn->real_escape_string($data->nhahang);
$loinhan = $conn->real_escape_string($data->loinhan);

$sql = "INSERT INTO lienhe (hoten, sdt, email, nhahang, loinhan) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $hoten, $sdt, $email, $nhahang, $loinhan);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Gửi liên hệ thành công! Chúng tôi sẽ gọi lại cho bạn sớm."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>