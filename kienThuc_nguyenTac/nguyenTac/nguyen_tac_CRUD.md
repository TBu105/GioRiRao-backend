# CRUD- Create,Read,Update,Delete

Mỗi chức năng trong phần mềm cần được phân quyền

## Create
Trước khi tạo dữ liệu cần validation dữ liệu, sử dụng joi
Cần kiểm tra dữ liệu trước đó đã tồn tại hay chưa
Nếu dữ liệu tạo phức tạp liên quan đến nhiều bản phải sử dụng transaction để bảo đảm tính toàn vẹn của dữ liệu

## Read
Sử dụng lean khi lấy dữ liệu trả về trong mongoose
`const users = await User.find().lean();  // .lean() returns plain JS objects`
Sử dụng phân trang nâng cao mongoose-pagnition-v2 (Đọc folder phan_trang_nang_cao)
Sử dụng redis để cache dữ liệu
Dữ liệu trả về cần có chọn lọc, không trả về dữ liệu bảo mật như mật khẩu, và không trả về dư thừa dữ liệu

## Update
Sử dụng patch để cập nhật dữ liệu
Trước khi cập nhật dữ liệu cần validation dữ liệu bao gồm loại bỏ null value, sử dụng joi
Sau khi update dữ liệu trả về dữ liệu mới được cập nhật, không được trả về dữ liệu cũ
Sau khi cập nhật dữ liệu thành công cần xóa dữ liệu cache cũ, và cache lại dữ liệu mới

## Delete
Sử dụng soft delete
Xóa theo dây chuyền, ví dụ: xóa thành phố, cần xóa khu vực, và xóa cửa hàng
Nếu dữ liệu được cache thì cần tiến hành xóa dữ liệu cache trước khi xóa mềm trong db