<?php
// phucuong_api/admin_dashboard_stats.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-8");

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)

$stats = [
    'today' => ['revenue' => 0, 'products' => 0],
    'week' => ['revenue' => 0, 'products' => 0],
    'month' => ['revenue' => 0, 'products' => 0],
    'year' => ['revenue' => 0, 'products' => 0]
];

// --- DOANH THU (TỪ BẢNG `orders`) ---
// (Lưu ý: Đang tính tổng tiền của tất cả đơn hàng, kể cả đơn 'Chờ xác nhận')
// (Nếu chỉ muốn tính đơn 'Hoàn thành', thêm "AND trangthai = 'Hoàn thành'" vào mệnh đề WHERE)

// Doanh thu Hôm nay
$sql_today_rev = "SELECT SUM(tongtien) as total_revenue FROM orders WHERE DATE(ngaytao) = CURDATE()";
$stats['today']['revenue'] = $conn->query($sql_today_rev)->fetch_assoc()['total_revenue'] ?? 0;

// Doanh thu Tuần này (Bắt đầu từ Thứ 2)
$sql_week_rev = "SELECT SUM(tongtien) as total_revenue FROM orders WHERE YEARWEEK(ngaytao, 1) = YEARWEEK(CURDATE(), 1)";
$stats['week']['revenue'] = $conn->query($sql_week_rev)->fetch_assoc()['total_revenue'] ?? 0;

// Doanh thu Tháng này
$sql_month_rev = "SELECT SUM(tongtien) as total_revenue FROM orders WHERE YEAR(ngaytao) = YEAR(CURDATE()) AND MONTH(ngaytao) = MONTH(CURDATE())";
$stats['month']['revenue'] = $conn->query($sql_month_rev)->fetch_assoc()['total_revenue'] ?? 0;

// Doanh thu Năm này
$sql_year_rev = "SELECT SUM(tongtien) as total_revenue FROM orders WHERE YEAR(ngaytao) = YEAR(CURDATE())";
$stats['year']['revenue'] = $conn->query($sql_year_rev)->fetch_assoc()['total_revenue'] ?? 0;


// --- SẢN PHẨM ĐÃ BÁN (TỪ BẢNG `order_items`) ---
// (JOIN với `orders` để lấy ngày)

// SP Hôm nay
$sql_today_prod = "SELECT SUM(oi.soluong) as total_products FROM order_items oi JOIN orders o ON oi.order_id = o.id_donhang WHERE DATE(o.ngaytao) = CURDATE()";
$stats['today']['products'] = $conn->query($sql_today_prod)->fetch_assoc()['total_products'] ?? 0;

// SP Tuần này
$sql_week_prod = "SELECT SUM(oi.soluong) as total_products FROM order_items oi JOIN orders o ON oi.order_id = o.id_donhang WHERE YEARWEEK(o.ngaytao, 1) = YEARWEEK(CURDATE(), 1)";
$stats['week']['products'] = $conn->query($sql_week_prod)->fetch_assoc()['total_products'] ?? 0;

// SP Tháng này
$sql_month_prod = "SELECT SUM(oi.soluong) as total_products FROM order_items oi JOIN orders o ON oi.order_id = o.id_donhang WHERE YEAR(o.ngaytao) = YEAR(CURDATE()) AND MONTH(o.ngaytao) = MONTH(CURDATE())";
$stats['month']['products'] = $conn->query($sql_month_prod)->fetch_assoc()['total_products'] ?? 0;

// SP Năm này
$sql_year_prod = "SELECT SUM(oi.soluong) as total_products FROM order_items oi JOIN orders o ON oi.order_id = o.id_donhang WHERE YEAR(o.ngaytao) = YEAR(CURDATE())";
$stats['year']['products'] = $conn->query($sql_year_prod)->fetch_assoc()['total_products'] ?? 0;

// Trả về JSON
echo json_encode($stats);
$conn->close();
?>