<?php
// phucuong_api/admin_add_news.php
include 'db.php'; // Đã bao gồm CORS

// 1. Kiểm tra dữ liệu text
if (!isset($_POST['title']) || !isset($_POST['excerpt']) || !isset($_POST['content']) || !isset($_POST['featured'])) {
    echo json_encode(["success" => false, "message" => "Thiếu thông tin tin tức."]);
    exit;
}

// 2. Kiểm tra file hình ảnh
if (!isset($_FILES['hinhanh']) || $_FILES['hinhanh']['error'] != UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "Lỗi upload hình ảnh."]);
    exit;
}

// Lấy thông tin
$title = $conn->real_escape_string($_POST['title']);
$excerpt = $conn->real_escape_string($_POST['excerpt']);
$content = $conn->real_escape_string($_POST['content']);
$featured = intval($_POST['featured']); // 0 hoặc 1

// 3. Xử lý file upload
$file = $_FILES['hinhanh'];
$filename = basename($file['name']);
// Upload vào thư mục /public/Media/ của React
$upload_dir = 'C:/Users/Admin/banh-trang/public/Media/'; // <-- Sửa đường dẫn này nếu project React của bạn ở chỗ khác
$target_file_path = $upload_dir . $filename;

if (move_uploaded_file($file['tmp_name'], $target_file_path)) {
    
    // 4. Thêm vào CSDL
    $sql = "INSERT INTO tintuc (title, excerpt, content, featured, image) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssis", $title, $excerpt, $content, $featured, $filename);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thêm tin tức thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi lưu vào CSDL: " . $conn->error]);
    }
    $stmt->close();
    
} else {
    echo json_encode(["success" => false, "message" => "Lỗi khi di chuyển file upload."]);
}

$conn->close();
?>