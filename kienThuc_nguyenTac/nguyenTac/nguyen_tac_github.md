# Cấu trúc nhánh
main: Nhánh chính, chứa code ổn định để deploy
develop: Nhánh phát triển chính
feature/*: Các nhánh tính năng (VD: feature/login)
hotfix/*: Nhánh sửa lỗi khẩn cấp

# Quy trình sử dụng repo
Sử dụng link hướng dẫn quy trình github của nhóm
https://www.youtube.com/watch?v=jRLGobWwA3Y

Trước tiên chúng ta cần fork repo
Sau khi fork xong chúng ta tiến hành clone và chạy code như bình thường
Sửa code
add code, commit code, push code
Sau khi code đã được push lên ta tiến hành tạo pull request
Khi tạo pull request chúng ta cần tuần thủ theo nguyên tắc viết pull request (đọc ở bên dưới)

# Quy trình code
Trước khi code một chức năng mới ta phải pull code về trước

Khi có một chức năng mới, nhóm chức năng mới, hoặc thay đổi logic của chức năng ta tạo nhánh feature/* để lập trình
Ví dụ: feature/User, feature/forgotPassword

Khi có một lỗi ngoài ý muốn ta tạo nhánh hotfix/* để sử dụng
Ví dụ: hotfix/fixLogin

Sau khi lập trình xong, chúng ta tiến hành push code lên github
Sau đó tạo pull request để merge code vào reposiotry chính

Khi develop đã chạy ổn định chúng ta tiến hành merge code vào main để deployment

# Commit message format
feat: thêm tính năng mới
fix: sửa lỗi
docs: thêm/sửa documentation
style: format code, sửa lỗi typo
refactor: tối ưu code không ảnh hưởng logic

ví dụ
git commit -m "feat: thêm tính năng liên quan đến Người dùng"
git commit -m "refactor: tối ưu hàm tạo nước"

# Cách viết pull request
## Mô tả
- Thêm chức năng đăng nhập
- Xử lý validation form
- Tích hợp API login

## Những thay đổi chính
- Thêm file LoginForm.js
- Thêm API service cho login
- Thêm error handling

## Cách test
1. Nhập email/password hợp lệ -> login thành công
2. Nhập sai format email -> hiện validation error
3. Nhập sai password -> hiện thông báo lỗi

## Screenshots
[Nếu có UI thì đính kèm ảnh]

## Lưu ý
- Cần setup biến môi trường API_URL
- Update file .env.example