<?php
// phucuong_api/admin_add_product.php
include 'db.php'; // Đã bao gồm CORS

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)

// 1. Kiểm tra xem dữ liệu text có được gửi không
if (!isset($_POST['tensp']) || !isset($_POST['gia']) || !isset($_POST['danhmuc'])) {
    echo json_encode(["success" => false, "message" => "Thiếu thông tin sản phẩm."]);
    exit;
}

// 2. Kiểm tra xem file hình ảnh có được gửi không
if (!isset($_FILES['hinhanh']) || $_FILES['hinhanh']['error'] != UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "Lỗi upload hình ảnh."]);
    exit;
}

// Lấy thông tin
$tensp = $conn->real_escape_string($_POST['tensp']);
$gia = floatval($_POST['gia']);
$mota = $conn->real_escape_string($_POST['mota']);
$danhmuc = $conn->real_escape_string($_POST['danhmuc']);

// 3. Xử lý file upload
$file = $_FILES['hinhanh'];
$filename = basename($file['name']); // Lấy tên file gốc

// --- SỬA LỖI Ở ĐÂY ---
// Trỏ đường dẫn tuyệt đối đến thư mục 'public/Upload' của project React
// (Hãy đảm bảo đường dẫn này chính xác 100% với máy của bạn)
$upload_dir = 'C:/Users/Admin/banh-trang/public/Upload/'; // <-- SỬA DÒNG NÀY

// LƯU Ý: Phải dùng dấu gạch chéo (/) thay vì (\)
// --------------------

$target_file_path = $upload_dir . $filename;

// Di chuyển file từ thư mục tạm sang thư mục 'Upload' của React
if (move_uploaded_file($file['tmp_name'], $target_file_path)) {
    
    // 4. Thêm sản phẩm vào CSDL
    $sql = "INSERT INTO sanpham (tensp, gia, mota, danhmuc, hinhanh) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdsss", $tensp, $gia, $mota, $danhmuc, $filename); // Lưu TÊN FILE vào CSDL

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thêm sản phẩm thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi lưu vào CSDL: " . $conn->error]);
    }
    $stmt->close();
    
} else {
    echo json_encode(["success" => false, "message" => "Lỗi khi di chuyển file upload. Kiểm tra lại đường dẫn hoặc quyền (permission)."]);
}

$conn->close();
?>