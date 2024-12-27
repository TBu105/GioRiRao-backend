app.get("/items", async (req, res) => {
  const cacheKey = "items_list";

  try {
    // Kiểm tra dữ liệu trong cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Data fetched from cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Nếu không có trong cache, truy vấn từ MongoDB
    const items = await Item.find();
    // Lưu dữ liệu vào cache với thời gian sống (TTL) là 60 giây
    await redis.set(cacheKey, JSON.stringify(items), "EX", 60);

    console.log("Data fetched from MongoDB and saved to cache");
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const cacheKey = "items_list";

  try {
    // Cập nhật dữ liệu trong MongoDB
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Xóa cache để làm mới dữ liệu
    await redis.del(cacheKey);
    console.log("Cache cleared after update");

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
