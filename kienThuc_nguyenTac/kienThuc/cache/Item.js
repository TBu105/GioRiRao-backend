// Tạo schema và model
const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Item = mongoose.model("Item", ItemSchema);
