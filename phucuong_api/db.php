<?php
// phucuong_api/db.php
$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "phucuong_db";

// --- THÊM CÁC DÒNG NÀY VÀO ---
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
// --- KẾT THÚC THÊM ---

$conn = new mysqli($servername, $username_db, $password_db, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>