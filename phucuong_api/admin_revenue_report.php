<?php
// phucuong_api/admin_revenue_report.php
include 'db.php'; // Đã bao gồm CORS
header("Content-Type: application/json; charset=UTF-R");

// (Trong dự án thật, bạn nên kiểm tra quyền Admin ở đây)

$type = $_GET['type'] ?? 'day'; // Mặc định là 'day'
$label = "";
$sql_where = "";

// GHI CHÚ: Giống như file PHP của bạn, code này đang tính doanh thu
// của TẤT CẢ đơn hàng (kể cả 'Chờ xác nhận'). 
// Nếu bạn CHỈ muốn tính đơn 'Hoàn thành', hãy thêm 
// "AND trangthai = 'Hoàn thành'" vào các mệnh đề WHERE.

$base_sql = "SELECT SUM(tongtien) as totalRevenue FROM orders WHERE ";

switch ($type) {
    case 'day':
        $date = $_GET['date'] ?? date('Y-m-d'); // Mặc định là hôm nay
        $sql_where = "DATE(ngaytao) = '$date'";
        $label = "Doanh thu ngày $date";
        break;

    case 'month':
        $month = $_GET['month'] ?? date('Y-m'); // Mặc định là tháng này
        $sql_where = "DATE_FORMAT(ngaytao, '%Y-%m') = '$month'";
        $label = "Doanh thu tháng $month";
        break;

    case 'quarter':
        $year = $_GET['year'] ?? date('Y');
        $quarter = $_GET['quarter'] ?? 1;
        $sql_where = "YEAR(ngaytao) = $year AND QUARTER(ngaytao) = $quarter";
        $label = "Doanh thu Quý $quarter / $year";
        break;

    case 'year':
        $year = $_GET['year'] ?? date('Y');
        $sql_where = "YEAR(ngaytao) = $year";
        $label = "Doanh thu năm $year";
        break;
    
    default:
        echo json_encode(["success" => false, "message" => "Loại báo cáo không hợp lệ."]);
        exit;
}

// Chạy truy vấn
$result = $conn->query($base_sql . $sql_where);
$totalRevenue = 0;
if ($result) {
    $totalRevenue = $result->fetch_assoc()['totalRevenue'] ?? 0;
}

// Trả về JSON
echo json_encode([
    "success" => true,
    "label" => $label,
    "totalRevenue" => $totalRevenue
]);
$conn->close();
?>