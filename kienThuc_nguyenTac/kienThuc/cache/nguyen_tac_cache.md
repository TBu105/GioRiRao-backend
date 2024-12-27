# Nguyên tắc khi cache dữ liệu

Không phải dữ liệu nào cũng cache

## Dữ liệu nào cần cache
Dữ liệu được đọc nhiều và thay đổi ít
Dữ liệu được tính toán phức tạp

## Vậy dữ liệu nào không nên cache
Dữ liệu bị thay đổi liên tục
Dữ liệu nhạy cảm, bảo mật cao


## Nguyên tắc đặt tên cho dữ liệu được cache

Sử dụng time to live cho dữ liệu được cache

# Các bước triển khai cache

1. Tạo file config để kết nối với redis database
2. Sử dụng tùy vào trường hợp

## Trường hợp: Cache danh sách dữ liệu
Client      Server       Redis        MongoDB
   |           |            |             |
   |---------->|            |             |   1. Gửi yêu cầu `GET /items`
   |           |----------->|             |   2. Kiểm tra cache (Redis GET)
   |           |<-----------|             |   3. Nếu có cache: trả dữ liệu
   |<----------|            |             |   4. Kết thúc
   |           |            |             |
   |           |----------->|             |   5. Nếu không có cache
   |           |            |----------->|   6. Truy vấn MongoDB
   |           |            |<-----------|   7. Nhận dữ liệu từ MongoDB
   |           |<-----------|             |   8. Lưu dữ liệu vào Redis (SET)
   |<----------|            |             |   9. Trả dữ liệu về client


## Trường hợp: Cache cập nhật dữ liệu

Client          Server          Redis         MongoDB
   |               |              |              |
   |-------------->|              |              |   1. Gửi yêu cầu cập nhật `PUT /items :id`
   |               |------------->|              |   2. Xóa cache liên quan (Redis DEL)
   |               |<-------------|              |   3. Cache bị xóa thành công
   |               |-------------->|             |   4. Gửi lệnh cập nhật tới MongoDB
   |               |<--------------|             |   5. Dữ liệu được cập nhật trong MongoDB
   |               |------------->|              |   6. Lưu lại dữ liệu mới vào cache (Redis SET)
   |               |<-------------|              |   7. Cache được cập nhật
   |<--------------|              |              |   8. Trả kết quả cập nhật về client
