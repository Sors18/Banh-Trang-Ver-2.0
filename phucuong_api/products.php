<?php
// phucuong_api/products.php
include 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$danhmuc_map = [
    'banh-trang' => 'Banhtrang',
    'rau-salad' => 'Salad',
    'mon-an-nhe' => 'Monannhe',
    'mon-ga' => 'Mongachimlon',
    'mon-ca' => 'Monca'
];

$products = [];
$category = isset($_GET['category']) ? $_GET['category'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;
$q = isset($_GET['q']) ? $_GET['q'] : null;

if ($id) {
    // Lấy chi tiết 1 sản phẩm
    $id = intval($id);
    $sql = "SELECT * FROM sanpham WHERE id_sanpham = $id";
} else if ($category && isset($danhmuc_map[$category])) {
    // Lấy sản phẩm theo danh mục
    $db_category = $danhmuc_map[$category];
    $sql = "SELECT * FROM sanpham WHERE danhmuc = '$db_category'";
} else if ($q) {
    // Tìm kiếm sản phẩm
    $q = $conn->real_escape_string($q);
    $sql = "SELECT * FROM sanpham WHERE tensp LIKE '%$q%'";
} else {
    // Lấy tất cả sản phẩm
    $sql = "SELECT * FROM sanpham";
}

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

if ($id && count($products) > 0) {
    echo json_encode($products[0]); // Trả về 1 object nếu tìm bằng id
} else {
    echo json_encode($products); // Trả về mảng
}
$conn->close();
?>