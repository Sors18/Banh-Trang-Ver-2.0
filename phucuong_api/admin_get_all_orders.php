<?php
// phucuong_api/admin_get_all_orders.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

// (Trong dự án thật, bạn nên kiểm tra xem người gọi có phải là admin không)

$orders = [];
// Lấy tất cả đơn hàng, mới nhất lên trước
$sql = "SELECT id_donhang, hoten, diachi, sdt, tongtien, trangthai, ngaytao 
        FROM orders 
        ORDER BY ngaytao DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders); // Trả về mảng các đơn hàng
$conn->close();
?>