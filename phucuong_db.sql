-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 15, 2025 lúc 08:59 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `phucuong_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lienhe`
--

CREATE TABLE `lienhe` (
  `id` int(11) NOT NULL,
  `hoten` varchar(100) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nhahang` varchar(255) NOT NULL,
  `loinhan` text DEFAULT NULL,
  `ngaygui` timestamp NOT NULL DEFAULT current_timestamp(),
  `trangthai` varchar(50) NOT NULL DEFAULT 'Mới'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lienhe`
--

INSERT INTO `lienhe` (`id`, `hoten`, `sdt`, `email`, `nhahang`, `loinhan`, `ngaygui`, `trangthai`) VALUES
(1, 'Le Bao Phuc', '0353395733', 'phuclun1722@gmail.com', 'CS1', 'Ca doi thg Son', '2025-11-15 07:20:16', 'Mới');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id_donhang` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hoten` varchar(100) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `tongtien` decimal(10,2) NOT NULL,
  `trangthai` varchar(50) NOT NULL DEFAULT 'Chờ xác nhận',
  `ngaytao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id_donhang`, `user_id`, `hoten`, `diachi`, `sdt`, `tongtien`, `trangthai`, `ngaytao`) VALUES
(1, 1, 'Phuc', 'Kim Ngưu', '0353395733', 338000.00, 'Hoàn thành', '2025-11-14 06:11:29'),
(2, NULL, 'Phuc', 'dsadas', '0353395733', 159000.00, 'Đã hủy', '2025-11-14 06:18:21'),
(3, 1, 'Phuc', 'Kim Ngưu', '0353395733', 328000.00, 'Hoàn thành', '2025-11-14 06:34:50'),
(4, 1, 'Phuc', 'Kim Ngưu', '0353395733', 179000.00, 'Đã hủy', '2025-11-15 05:38:02'),
(5, 1, 'Phuc', 'dsadas', '0353395733', 159000.00, 'Hoàn thành', '2025-11-15 05:44:26'),
(6, 1, 'Phuc', 'Kim Ngưu', '0353395733', 189000.00, 'Hoàn thành', '2025-11-15 05:55:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `tensp` varchar(250) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gia_luc_mua` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `tensp`, `soluong`, `gia_luc_mua`) VALUES
(1, 1, 3, 'Bánh tráng thịt Heo quay', 2, 169000.00),
(2, 2, 8, 'Salad rau càng cua', 1, 159000.00),
(3, 3, 8, 'Salad rau càng cua', 1, 159000.00),
(4, 3, 3, 'Bánh tráng thịt Heo quay', 1, 169000.00),
(5, 4, 5, 'Bánh tráng cuốn Bò tơ', 1, 179000.00),
(6, 5, 4, 'Bánh tráng thịt Heo hấp', 1, 159000.00),
(7, 6, 13, 'Đậu hũ non hải sản sốt nấm', 1, 189000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `id_sanpham` int(11) NOT NULL,
  `danhmuc` varchar(250) DEFAULT NULL,
  `tensp` varchar(250) DEFAULT NULL,
  `gia` int(11) DEFAULT NULL,
  `hinhanh` varchar(250) DEFAULT NULL,
  `mota` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`id_sanpham`, `danhmuc`, `tensp`, `gia`, `hinhanh`, `mota`) VALUES
(3, 'Banhtrang', 'Bánh tráng thịt Heo quay', 168000, 'Banh-trang-thit-heo-quay-600x600.jpg', 'Nguyên liệu chính của món này chính là thịt ba chỉ Heo quay. Lớp da vàng ươm, nỏ bóng giòn bì. Lớp thịt ba chỉ mềm ngọt thịt.'),
(4, 'Banhtrang', 'Bánh tráng thịt Heo hấp', 159000, 'Banh-trang-thit-heo-hap-600x600.jpg', 'Nguyên liệu gồm: Thịt Heo ba chỉ hấp, Bún tươi, Tỏi, ớt, đường, sả, chanh tươi, Bánh tráng cuốn, mắm nêm nguyên chất.'),
(5, 'Banhtrang', 'Bánh tráng cuốn Bò tơ', 179000, 'Banh-trang-cuon-bo-to-600x600.jpg', 'Thịt bò tơ chắc, tươi ngon, hương vị đặc trưng được lát mỏng. Cuốn cùng các loại rau gia vị và củ quả. Chấm với nước tương.'),
(6, 'Banhtrang', 'Bánh tráng cuốn Bò lá lốt', 169000, 'Banh-trang-cuon-bo-la-lot-600x600.jpg', 'Chả thịt Bò quấn lá lốt béo ngậy thơm nhức mũi. Cuốn cùng các loại rau gia vị. Chấm nước mắm nêm chuẩn vị miền Trung.'),
(7, 'Salad', 'Bí nụ non xào tỏi', 109000, 'Bi-nu-non-xao-toi-600x600.jpg', 'Bí nụ non tươi xanh, được xào nhanh tay với tỏi phi thơm lừng, giữ được độ giòn và vị ngọt tự nhiên.'),
(8, 'Salad', 'Salad rau càng cua', 159000, 'Salad-rau-cang-cua-600x600.jpg', 'Rau càng cua tươi mát, giòn, trộn cùng thịt bò, cà chua bi và sốt dầu giấm đặc trưng.'),
(9, 'Salad', 'Salad Rong biển trứng Tôm', 109000, 'Salad-rong-bien-trung-tom-600x599.jpg', 'Salad có vị giòn ngon, hơi có mùi tanh của Rong biển. Khi kết hợp với trứng Tôm tạo nên một hương vị thơm ngon rất khó tả.'),
(10, 'Salad', 'Nộm ngó Sen tai Lợn Tôm', 125000, 'Nom-ngo-sen-tai-lon-tom-600x600.jpg', 'Nộm Ngó Sen tai Lợn Tôm là món ăn khai vị rất thú vị. Tai Lợn giòn sần sật. Ngó Sen là loại rau rất tốt cho sức khỏe.'),
(11, 'Salad', 'Nộm Miến hải sản sốt Thái', 169000, 'Nom-mien-hai-san-xot-thai-600x600.jpg', 'Nộm miến hải sản sốt Thái là món ăn rất phù hợp đối với những người muốn giảm cân. Vị chua cay mặn ngọt hài hòa.'),
(12, 'Salad', 'Nộm Sứa', 95000, 'Nom-sua-600x593.jpg', 'Nộm Sứa rất thích hợp làm món khai vị. Món ăn này bổ mát, chữa chứng huyết, huyết ứ nhiệt nổi mụn, đau đầu chóng mặt.'),
(13, 'Monannhe', 'Đậu hũ non hải sản sốt nấm', 189000, 'Dau-hu-non-hai-san-sot-nam-600x600.jpg', 'Đậu hũ non hải sản sốt nấm gồm tôm, mực đậu hũ và các loại nấm. Đây là món ăn lạ và thú vị cung cấp nhiều chất Protein.'),
(14, 'Monannhe', 'Đậu hũ non rang muối', 95000, 'Dau-hu-non-rang-muoi-600x600.jpg', 'Đậu hũ non rang muối: Vị ngậy của ruốc tôm là sự kết hợp với đậu hũ non mềm mịn tuyệt vời.'),
(15, 'Monannhe', 'Nem nấm hải sản', 179000, 'Nem-nam-hai-san-600x600.jpg', 'Nem nấm hải sản: là món ăn giàu kẽm và sắt. Đây là những chất dinh dưỡng rất tốt để cải thiện các vấn đề xấu của căn bệnh thiếu máu.'),
(16, 'Monannhe', 'Nem Ốc', 149000, 'Nem-oc-600x600.jpg', 'Thịt Ốc Nhồi được băm nhỏ trộn cùng Tôm tươi, thịt Heo xay, mộc nhĩ, nấm hương. Lớp vỏ ngoài giòn rụm.'),
(17, 'Monannhe', 'Khoai Tây chiên', 59000, 'Khoai-tay-chien-600x600.jpg', 'Khoai Tây chiên cung cấp lượng chất béo khá lớn. Trong 100g Khoai Tây chiên chứa khoảng 150 calo.'),
(18, 'Monannhe', 'Ngô chiên bơ', 59000, 'Ngo-chien-bo-600x600.jpg', 'Trong 100g ngô có khoảng 1.2g chất béo, 2.7g chất xơ, 3.2g đường. Cung cấp năng lượng cho bạn 170 calo.'),
(19, 'Mongachimlon', 'Gà hấp mắm nửa con', 285000, 'ga-hap-mam-600x600.jpg', 'Gà mái ta hấp với nước mắm cốt và các loại gia vị như hạt tiêu, tỏi, ớt…'),
(20, 'Mongachimlon', 'Chim Câu quay', 179000, 'Chim-cau-quay-600x600.jpg', 'Thịt chim Câu chứa nhiều chất dinh dưỡng. Đặc biệt hàm lượng protein (chất đạm) cao lên đến 24%.'),
(21, 'Mongachimlon', 'Chân giò Heo muối chiên giòn', 255000, 'Chan-gio-heo-muoi-chien-gion-600x599.jpg', 'Chân giò Heo muối chiên giòn: có lớp bì giòn vàng ươm, phần thịt lại dai ngon vô cùng, thấm đều hương vị.'),
(22, 'Mongachimlon', 'Dồi Heo nướng', 135000, 'Doi-heo-nuong-600x600.jpg', 'Khi ăn ta cảm nhận được vị ngon của thịt nạc, vị dai dai của lòng non, vị giòn sần sật của sụn non.'),
(23, 'Mongachimlon', 'Chim Câu xúc phồng tôm', 155000, 'Chim-cau-xuc-phong-tom.jpg', 'Chim Câu xúc phồng tôm là món ăn chơi thú vị. Phồng tôm chiên giòn tan. Thịt chim Bồ Câu ngọt bổ dưỡng.'),
(24, 'Mongachimlon', 'Chân Gà chiên mắm', 149000, 'Chan-ga-chien-mam-600x598.jpg', 'Chân Gà chiên mắm: có vị đậm đà của nước mắm, chân Gà ăn dai, giòn. Chân Gà có màu vàng đậm, nước sốt sánh quện.'),
(25, 'Monca', 'Cá lăng hấp xì dầu', 215000, 'Ca-lang-hap-xi-dau-600x600.jpg', 'Cá lăng tươi ngon hấp cùng xì dầu, gừng, hành lá, giữ được vị ngọt tự nhiên của cá và hương thơm của xì dầu.'),
(26, 'Monca', 'Cá Lăng nướng sa tế TomYum', 225000, 'Ca-lang-nuong-sate-tomyum.jpg', 'Cá Lăng nướng sa tế Tom Yum, ăn kèm bún tươi, bánh tráng và rau sống.'),
(27, 'Monca', 'Lẩu cá Lăng măng cay', 460000, 'Lau-ca-lang-mang-cay-600x600.jpg', 'Cá Lăng sông với thịt màu trắng, dai béo, thơm ngọt. Nồi nước dùng từ xương lợn, kết hợp với vị chua của măng.'),
(28, 'Monca', 'Cá Trắm giòn trộn cay', 199000, 'Ca-tram-gion-tron-cay-600x600.jpg', 'Cá Trắm giòn trộn cay: thịt cá Trắm giòn ngọt hòa cùng vị chua thanh của chanh, cay nhẹ của ớt.'),
(29, 'Monca', 'Cá Lăng hấp chanh', 225000, 'Ca-lang-hap-chanh-600x600.jpg', 'Cá Lăng hấp chanh là món ăn lạ miệng. Thịt cá Lăng trắng, ngon, dai nhiều chất dinh dưỡng.'),
(30, 'Monca', 'Cá Kèo nướng muối ớt', 165000, 'ca-keo-nuong-muoi-ot-2-600x600.jpg', 'Tuy là món ăn dân dã nhưng món cá Kèo nướng muối ớt lại chinh phục thực khách bởi hương vị cay nồng đặc trưng, thơm ngon.'),
(31, 'Banhtrang', 'Bánh tráng Hanekawa', 5000001, 'hanekawa.jpg', 'Hanekawa Tsubasa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tintuc`
--

CREATE TABLE `tintuc` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tintuc`
--

INSERT INTO `tintuc` (`id`, `title`, `excerpt`, `image`, `featured`, `content`) VALUES
(6, 'Ưu đãi cả năm hấp dẫn tại Bánh tráng Phú Cường', 'Đón chào dịp lễ cuối năm tại Phú Cường, nhà hàng xin gửi tới khách hàng yêu thương những ưu đãi hấp dẫn sau: SINH NHẬT RỘN RÀNG VỚI ƯU ĐÃI TỚI 15% – Ưu đãi 10% đồ ăn cho khách', 'z6865494680732_f5090ff7dab4ff3b3f127b4fcf6b14e7-600x800.jpg', 0, 'Đón chào dịp lễ cuối năm tại Phú Cường, nhà hàng xin gửi tới khách hàng yêu thương những ưu đãi hấp dẫn sau:\\\\r\\\\n🎂 SINH NHẬT RỘN RÀNG VỚI ƯU ĐÃI TỚI 15%\\\\r\\\\n– Ưu đãi 10% đồ ăn cho khách có sinh nhật đúng ngày, trước hoặc sau 3 ngày,\\\\r\\\\n– Ưu đãi 5% trước hoặc sau 7 ngày sinh nhật.\\\\r\\\\n– Riêng Lê Văn Lương, khách hàng có sinh nhật sẽ được ưu đãi tới 15% hóa đơn đồ ăn hoặc chọn cho mình những món quà đáng yêu như bánh sinh nhật, gói trang trí tiệc: https://shorturl.at/W6hqc\\\\r\\\\n+ Chỉ cần mang CCCD, ảnh chụp giấy khai sinh của em bé để được áp dụng.\\\\r\\\\n+ Nếu cần phòng riêng để tổ chức tiệc và trang trí, bạn nên đặt trước tối thiểu 2 ngày. Để lại số điện thoại để được đối tác tiệc của Phú Cường tư vấn trang trí sự kiện hoặc bạn có thể tự trang trí theo sở thích.\\\\r\\\\n🌿 ĐẦU TUẦN XANH MÁT VỚI ƯU ĐÃI 4-1\\\\r\\\\n– TẶNG ngay 1 suất bánh tráng bất kỳ cho nhóm 4 người  đến ăn trực tiếp tại nhà hàng.\\\\r\\\\n– Áp dụng lũy kế cho đoàn đông 4, 8, 13…người được tặng 1, 2, 3… suất bánh tráng.\\\\r\\\\n– Áp dụng cho trẻ em cao trên 1m3.\\\\r\\\\n– Lịch áp dụng tại từng cơ sở:\\\\r\\\\n* Thứ 2: Bà Triệu, Nguyễn Chí Thanh, Vũ Phạm Hàm.\\\\r\\\\n* Thứ 2 + 3: Nguyên Hồng, Yết Kiêu, Trần Phú, Nguyễn Khánh Toàn, Lê Văn Lương, Lê Đức Thọ.\\\\r\\\\n👉 Đừng quên chụp ảnh và check-in #BánhtrángPhúCường nhé!'),
(7, 'Sinh nhật vui hết nấc tại Phú Cường CS 11 Lê Văn Lương – rinh ngay ưu đãi khủng', 'Bạn đang tìm kiếm địa điểm tổ chức sinh nhật lý tưởng khu vực Yên Hòa, Cầu Giấy? Đừng bỏ lỡ chương trình ưu đãi sinh nhật cực hot tại Bánh Tráng Phú Cường – CS11 Lê Văn Lương, áp', 'z6820844181652_fa54299c37a408613d12317d1fe2df70-400x400.jpg', 0, 'Bạn đang tìm kiếm địa điểm tổ chức sinh nhật lý tưởng khu vực Yên Hòa, Cầu Giấy? Đừng bỏ lỡ chương trình ưu đãi sinh nhật cực hot tại Bánh Tráng Phú Cường – CS11 Lê Văn Lương, áp dụng từ 20/07 – 20/09/2025 nhé!\\r\\n\\r\\n💥 Chỉ cần đặt tiệc đúng ngày, trước/sau ngày sinh nhật 7 ngày tại CS11 – Tầng 4, TTTM Diamond Place, số 25 Lê Văn Lương, bạn sẽ được chọn 1 trong 3 ưu đãi hấp dẫn sau, thay thế cho combo ưu đãi cũ (Giảm 10% & Tặng bánh tráng bất kỳ cho đoàn từ 6 người):\\r\\n🎁 3 ƯU ĐÃI SIÊU CHẤT CHỈ DÀNH RIÊNG CHO SINH NHẬT:\\r\\n1. Giảm ngay 15% hóa đơn đồ ăn\\r\\n(Áp dụng cho mọi tiệc sinh nhật đủ điều kiện – không bao gồm đồ uống)\\r\\n2. Giảm 5% hóa đơn đồ ăn + TẶNG bánh sinh nhật Paris Gateaux trị giá 400K\\r\\n(Áp dụng cho hóa đơn từ 3,6 triệu đồng – chưa bao gồm đồ uống)\\r\\n3. TẶNG GÓI TRANG TRÍ TIỆC SIÊU XINH trị giá 2 TRIỆU ĐỒNG\\r\\n(Áp dụng cho hóa đơn đồ ăn từ 10 triệu đồng, từ 5 mâm tiệc)'),
(8, 'Khám phá các khu vui chơi cho bé tại Phú Cường', 'Bạn đang tìm một nhà hàng vừa có đồ ăn ngon, vừa có không gian cho trẻ em vui chơi an toàn? Hãy đến với hệ thống Bánh Tráng Phú Cường, nơi không chỉ nổi tiếng với không gian rộng,', 'KHOI0211-600x400.jpg', 0, 'Bạn đang tìm một nhà hàng vừa có đồ ăn ngon, vừa có không gian cho trẻ em vui chơi an toàn?\\r\\n\\r\\nHãy đến với hệ thống Bánh Tráng Phú Cường, nơi không chỉ nổi tiếng với không gian rộng, tinh tế, sang trọn, thực đơn gần 100 món “gây nghiện” mà còn những khu vui chơi trẻ em hiện đại, sạch sẽ và đầy màu sắc, giúp các bé thoả sức vận động trong khi bố mẹ yên tâm thưởng thức bữa ăn.\\r\\n\\r\\nVới mong muốn mang đến trải nghiệm trọn vẹn cho các gia đình có con nhỏ, Bánh Tráng Phú Cường đã đầu tư xây dựng khu vui chơi trẻ em tại nhiều cơ sở lớn, nổi bật như.\\r\\n\\r\\nTại mỗi địa điểm, khu vui chơi được thiết kế với tông màu pastel vui nhộn, trang thiết bị đạt chuẩn an toàn và không gian sạch sẽ, thoáng mát. Bé có thể vui đùa với cầu trượt, nhà banh, xích đu mini hay thậm chí là khu tô màu và xếp hình sáng tạo.\\r\\n\\r\\n');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `isAdmin`) VALUES
(1, 'Phuc', 'phuclun1722@gmail.com', '$2y$10$JN3r56uH.PApMr/foY6hq.WwlvzhEvTDpV6MZSx/91X8L.vy2g6YK', '2025-11-14 05:43:53', 0),
(2, 'admin', 'phuclun17@gmail.com', '$2y$10$vaQAoPpfhD7okfeRsItDE.ymfp7/w.4A.VlKPmNo8uudzX1cz6IiG', '2025-11-14 08:29:33', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `lienhe`
--
ALTER TABLE `lienhe`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_donhang`),
  ADD KEY `user_id_index` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order` (`order_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id_sanpham`);

--
-- Chỉ mục cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `lienhe`
--
ALTER TABLE `lienhe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id_donhang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id_sanpham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `tintuc`
--
ALTER TABLE `tintuc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id_donhang`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `sanpham` (`id_sanpham`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
