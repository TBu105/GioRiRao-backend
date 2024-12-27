# Luồng đi của folder structure tổng quát

server -> app -> Router -> Middleware (optional), Validation -> Controller -> Service -> Repository -> Utils, Models

# Luồng đi cụ thể

## Create
Client gửi yêu cầu POST /user với dữ liệu người dùng.
Router nhận yêu cầu và chuyển tới controller createUser.
Middleware (nếu có) kiểm tra xác thực, quyền truy cập.
Validation kiểm tra dữ liệu đầu vào.
Controller gọi Service để xử lý logic và gọi repository để lưu dữ liệu.
Repository gọi Model để tạo dữ liệu và lưu dữ liệu vào cơ sở dữ liệu (MongoDB).
Controller trả về phản hồi cho client (ví dụ: mã 201 và dữ liệu người dùng mới).

# Giải thích chức năng của từng thư mục trong folder structure

## Router:
Chức năng: Router chịu trách nhiệm định tuyến các yêu cầu HTTP từ client tới các controller tương ứng. Nó sẽ phân tách các endpoint và gọi các controller phù hợp khi nhận được các yêu cầu (GET, POST, PUT, DELETE).

## Middleware
Chức năng: Middleware thực hiện các tác vụ trung gian trước khi yêu cầu đi đến controller, như xác thực người dùng, logging, kiểm tra quyền truy cập, kiểm tra token JWT, v.v.

## Validation:
Chức năng: Định nghĩa dữ liệu thế nào là hợp lệ

## Controller:
Controller là nơi nhận yêu cầu đã qua middleware và validation, và chịu trách nhiệm gọi các service để xử lý logic nghiệp vụ.

## Service:
Service chứa các logic nghiệp vụ, gọi các repository để truy cập cơ sở dữ liệu và xử lý các thao tác cụ thể.

## Repository:
Repository là nơi xử lý các thao tác trực tiếp với cơ sở dữ liệu, như tạo mới, đọc, cập nhật và xóa dữ liệu thông qua Mongoose.

## Utils:
Utils là nơi chứa các hàm tiện ích chung, có thể tái sử dụng trong toàn bộ ứng dụng như các công cụ xử lý chuỗi, số liệu, mã hóa, gửi email, v.v.

# Các folder khác

## Config
Được sử dụng để cấu hình các phần mềm thứ ba như mongodb, redis, cloudinary, ...
Nó còn được sủ dụng để khai báo các giá trị mặc định như HTTP status

# ENV
Khai báo các biến môi trường
Mat khau ket noi, ...

# KienThuc_NguyenTac

## KienThuc
folder này chứa các kiến thức mới

## NguyenTac
folder này chứa các nguyên tắc code cần tuân theo

# PhanVien

## DatPham
Công việc cần làm của Phạm Đạt