const { BadRequest, NotFound } = require("../config/error.response.config");
const xlsx = require("xlsx");
const inventoryRepository = require("../repositories/inventory.repo");
const Inventory = require("../models/Inventory");

const importInGoods = async (storeId, workbook) => {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet); // [{ name: 'Bột mì', quantity: 100 }, ...]

  // Lấy hoặc tạo mới Inventory
  let inventory = await inventoryRepository.findInventoryByStore({ storeId });

  if (!inventory) {
    inventory = new Inventory({
      storeId,
      ingredients: [],
    });
  }

  // Đảm bảo mảng ingredients tồn tại
  if (!Array.isArray(inventory.ingredients)) {
    inventory.ingredients = [];
  }

  // Cập nhật từng nguyên liệu
  for (const row of rows) {
    const { name, quantity } = row;

    if (!name || typeof quantity !== "number") {
      console.warn(`Bỏ qua dòng không hợp lệ: ${JSON.stringify(row)}`);
      continue;
    }

    const index = inventory.ingredients.findIndex((item) => {
      if (!item.name || !name) return false;
      return item.name.toLowerCase().trim() === name.toLowerCase().trim();
    });

    if (index >= 0) {
      inventory.ingredients[index].quantity += quantity;
    } else {
      inventory.ingredients.push({
        name: name.trim(),
        quantity,
      });
    }
  }

  await inventory.save();

  // Xoá file sau khi xử lý xong
  return inventory;
};

const findInventoryByStore = async (storeId) => {
  let inventory = await inventoryRepository.findInventoryByStore({ storeId });

  return inventory;
};

module.exports = {
  importInGoods,
  findInventoryByStore,
};
