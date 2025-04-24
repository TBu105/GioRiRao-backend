const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const xlsx = require("xlsx");
const inventoryService = require("../services/inventory.service");
const fs = require("fs");

const importInGoods = asyncHandler(async (req, res) => {
  const storeId = req.params.storeId;
  const workbook = xlsx.readFile(req.file.path);
  const inventory = await inventoryService.importInGoods(storeId, workbook);

  fs.unlink(req.file.path, () => {});

  return res.status(HttpStatusCodes.CREATED.code).json({
    message: "Nhập hàng thành công",
    inventory,
  });
});

const findInventoryByStore = asyncHandler(async (req, res) => {
    const storeId = req.params.storeId;

    const inventory = await inventoryService.findInventoryByStore(storeId)
  
    return res.status(HttpStatusCodes.OK.code).json({
      message: "Lấy danh sách hàng tồn kho thành công",
      inventory,
    });
  });

module.exports = {
  importInGoods,
  findInventoryByStore
};
