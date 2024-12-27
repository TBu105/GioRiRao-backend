# Mongoose-paginate-v2 là gì
Thư viện mongoose-paginate-v2 là một plugin dành cho Mongoose, giúp thực hiện phân trang dữ liệu một cách dễ dàng và hiệu quả.

# Nguyên lý hoạt động của mongoose-paginate-v2

## Dữ liệu đầu vào
Lấy vào 4 dữ liệu để tiến hành lọc dữ liệu
page: bạn muốn lấy dữ liệu ở trang số mấy
limit: trả về số lượng dữ liệu bạn muốn
sort: sắp xếp theo dữ liệu tăng dần, giảm dần
filter: lọc dữ liệu theo điều kiện

## Cách hoạt động của page

Công thức tính số lượng tài liệu cần bỏ qua (skip) dựa trên page:

`skip = (page - 1) * limit`


## Sử dụng mongoose-paginate-v2 để phân trang
Xem file theo thứ tự
 Post -> post controller

## Front end gọi API để phân trang
Ví dụ 1: Lấy trang 1, mỗi trang 5 bài viết, sắp xếp theo ngày tạo giảm dần.
`GET /posts?page=1&limit=5&sort=-createdAt`

Ví dụ 2: Lọc các bài viết theo tag "JavaScript".
`GET /posts?page=1&limit=5&sort=title&filter={"author":"John"}`


## Dữ liệu đầu ra

### Ví dụ
```
{
  "docs": [
    { "_id": "1", "title": "Post 1", "author": "John", "createdAt": "2024-12-25T00:00:00Z" },
    { "_id": "2", "title": "Post 2", "author": "John", "createdAt": "2024-12-24T00:00:00Z" }
  ],
  "totalDocs": 20,
  "limit": 10,
  "totalPages": 2,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```
### Giải thích các fields trả về
totalDocs: Tổng số tài liệu khớp với filter.
limit: Số lượng tài liệu mỗi trang.
page: Trang hiện tại.
totalPages: Tổng số trang dựa trên limit.
hasPrevPage và hasNextPage: Kiểm tra xem có trang trước hoặc trang sau không.
prevPage và nextPage: Trang trước và trang tiếp theo (nếu có).
pagingCounter: Giá trị bắt đầu đếm số thứ tự trên trang (dành cho hiển thị).

#### Những dữ liệu trả về này chúng ta sử dụng nó cho mục đích gì và sử dụng như thế nào
##### totalDocs (Tổng số tài liệu)
Mục đích:
Hiển thị tổng số lượng tài liệu phù hợp với bộ lọc hoặc tìm kiếm mà người dùng đã thực hiện.

Cách sử dụng:
Hiển thị cho người dùng biết có bao nhiêu kết quả.
Ví dụ:
"Có 120 kết quả cho từ khóa 'sách lập trình'".
##### limit (Số tài liệu mỗi trang)
Mục đích:
Hiển thị và xác định số tài liệu tối đa trên mỗi trang, giúp người dùng dễ điều hướng.

Cách sử dụng:
Xác định số lượng tài liệu hiển thị trong danh sách.
Người dùng có thể thay đổi số lượng tài liệu mỗi trang thông qua bộ chọn (dropdown).
##### page (Trang hiện tại)
Mục đích:
Hiển thị vị trí hiện tại của người dùng trong danh sách các trang.

Cách sử dụng:
Hiển thị trạng thái:
"Trang 2 trên tổng số 5 trang".

Xác định nội dung cần tải về khi người dùng chọn trang khác
##### totalPages (Tổng số trang)
Mục đích:
Xác định số lượng trang dựa trên totalDocs và limit.

Cách sử dụng:
Tạo thanh điều hướng phân trang (pagination bar).
##### hasPrevPage và hasNextPage
Mục đích:
Xác định liệu có tồn tại trang trước hoặc trang tiếp theo không, giúp hiển thị hoặc vô hiệu hóa các nút điều hướng.

Cách sử dụng:
Vô hiệu hóa nút "Trước" nếu hasPrevPage = false.
Vô hiệu hóa nút "Sau" nếu hasNextPage = false.
##### prevPage và nextPage
Mục đích:
Cung cấp số trang trước và sau, giúp chuyển nhanh đến các trang này.

Cách sử dụng:
Tạo liên kết hoặc hành động để điều hướng tới prevPage hoặc nextPage

