# PRD: Công cụ theo dõi đơn hàng cần xử lý

## 1. Bài toán
Nhân sự CS Online gặp tình trạng hệ thống chỉ hiển thị các đơn hàng được set pipeline trong ngày hiện tại; sang ngày mới, đơn cũ không còn hiển thị dù chưa xử lý xong. Vấn đề phát sinh hằng ngày (ước tính 5 ngày/tuần). Hiện người dùng phải thủ công chỉnh pipeline của từng đơn sang ngày tiếp theo, mất khoảng 45 phút/ngày và vẫn có nguy cơ bỏ sót đơn.

## 2. Người dùng
- **Người dùng chính:** Nhân sự CS Online cần theo dõi các đơn đã được lên pipeline và chưa hoàn tất.
- **Quy mô ước lượng:** 5–10 nhân sự trong nhóm CS Online.
- **Nhu cầu chính:** Có danh sách tập trung, dễ lọc và cập nhật trạng thái các đơn còn tồn.

## 3. Phạm vi
**Chức năng chính**
1. Hiển thị danh sách đơn hàng cần xử lý, bao gồm cả đơn quá hạn hoặc được tạo từ ngày trước.
2. Lọc/tìm kiếm theo mã đơn, ngày xử lý dự kiến và trạng thái.
3. Hiển thị thông tin cơ bản của đơn: mã đơn, nội dung cần xử lý, người phụ trách, ngày đến hạn và trạng thái.
4. Cho phép cập nhật trạng thái: Chưa xử lý, Đang xử lý, Hoàn tất.
5. Đánh dấu/cảnh báo đơn quá hạn hoặc chưa hoàn tất để người dùng dễ nhận biết.

**Không làm trong kỳ này**
- Không thay thế hệ thống quản lý đơn hàng hoặc tự động thay đổi pipeline trên hệ thống hiện tại.
- Không tự động phân công đơn, gửi thông báo qua email/Zalo hoặc tích hợp với hệ thống bên ngoài.
- Không xây dựng báo cáo KPI/phân tích hiệu suất nâng cao.
- Không chỉnh sửa thông tin nghiệp vụ gốc của đơn hàng.

## 4. Luồng chính
1. Người dùng mở công cụ và xem danh sách tất cả đơn chưa hoàn tất, kể cả đơn từ những ngày trước.
2. Công cụ hiển thị ngày đến hạn, người phụ trách và trạng thái của từng đơn; đơn quá hạn được đánh dấu rõ.
3. Người dùng tìm kiếm hoặc lọc danh sách để xác định các đơn cần ưu tiên.
4. Người dùng mở đơn, xử lý theo quy trình hiện có rồi cập nhật trạng thái trong công cụ.
5. Khi hoàn tất, đơn chuyển khỏi danh sách “cần xử lý” nhưng vẫn được lưu để tra cứu. Đơn chưa hoàn tất tiếp tục xuất hiện vào ngày tiếp theo mà không cần chỉnh pipeline thủ công.

## 5. Dữ liệu
- **Bảng Đơn hàng:** Mã đơn, thông tin/tóm tắt đơn, ngày tạo, ngày đến hạn, liên kết hoặc mã tham chiếu đến đơn gốc. Lưu thông tin cần thiết để theo dõi.
- **Bảng Công việc xử lý:** Mã công việc, mã đơn, nội dung cần làm, người phụ trách, trạng thái, ngày đến hạn, thời điểm cập nhật. Theo dõi tiến độ xử lý của từng đơn.
- **Bảng Người dùng:** Mã người dùng, tên hiển thị, tài khoản/định danh nội bộ. Xác định người phụ trách và người cập nhật.
- **Bảng Lịch sử trạng thái:** Mã bản ghi, mã công việc, trạng thái cũ/mới, người cập nhật, thời gian và ghi chú tùy chọn. Giúp truy vết thay đổi khi cần.

## 6. Tiêu chí hoàn thành
- Danh sách hiển thị đầy đủ các đơn chưa hoàn tất qua ngày mới, không phụ thuộc ngày pipeline ban đầu.
- Người dùng có thể tìm kiếm/lọc và cập nhật trạng thái đơn thành công.
- Đơn hoàn tất không còn nằm trong danh sách cần xử lý nhưng vẫn tra cứu được.
- Đơn quá hạn được nhận diện rõ ràng.
- Thời gian thao tác theo dõi/chuyển ngày giảm đáng kể so với mức hiện tại 45 phút/ngày; mục tiêu ban đầu là giảm ít nhất 80% thời gian thủ công.
- Kiểm thử với 5–10 nhân sự CS Online xác nhận không còn phải chỉnh pipeline từng đơn chỉ để tránh bị mất khỏi danh sách.
