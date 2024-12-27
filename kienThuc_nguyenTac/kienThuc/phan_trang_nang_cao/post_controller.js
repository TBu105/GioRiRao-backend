const express = require("express");
const Post = require("./models/Post"); // Đường dẫn tới model Post
const app = express();

app.get("/posts", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      filter = "{}",
    } = req.query;

    // Chuyển đổi filter từ chuỗi JSON thành object
    const filterObj = JSON.parse(filter);

    // Phân trang, lọc và sắp xếp
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
    };

    const posts = await Post.paginate(filterObj, options);

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra!" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
