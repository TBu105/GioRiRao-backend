const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const storeService = require("../services/store.service");

const createStore = asyncHandler(async (req, res) => {
  // const { areaId } = req.params; // Lấy areaId từ URL param
  const storeData = req.body; // Gắn areaId vào storeData
  const store = await storeService.createStore(storeData); // Gọi service để tạo Store
  return res.status(HttpStatusCodes.CREATED.code).json({
    message: "Store created successfully",
    store,
  });
});

const updateStore = asyncHandler(async (req, res) => {
  const store = await storeService.updateStore(req.params.id, req.body);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Store updated successfully",
    store,
  });
});
const getStoreById = asyncHandler(async (req, res) => {
  const store = await storeService.getStoreById(req.params.id);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Store retrieved successfully",
    store,
  });
});
const updateManager = asyncHandler(async (req, res) => {
  const store = await storeService.updateManager(
    req.params.id,
    req.body.managerId
  );
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Store manager updated successfully",
    store,
  });
});
const updateStaff = asyncHandler(async (req, res) => {
  const store = await storeService.updateStaff(req.params.id, req.body.staffs);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Staffs added successfully to the store.",
    store,
  });
});
const deleteStaff = asyncHandler(async (req, res) => {
  const store = await storeService.deleteStaffs(req.params.id, req.body.staffs);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Store staff deleted successfully",
    store,
  });
});

const getStoresByAreaId = asyncHandler(async (req, res) => {
  const stores = await storeService.getStoresByArea(req.params.areaId);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Stores retrieved successfully",
    stores,
  });
});

module.exports = {
  createStore,
  updateStore,
  updateManager,
  getStoresByAreaId,
  updateStaff,
  getStoreById,
  deleteStaff,
};
