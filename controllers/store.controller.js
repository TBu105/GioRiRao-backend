const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const storeService = require("../services/store.service");

const createStore = asyncHandler(async (req, res) => {
  const { areaId } = req.params; // Lấy areaId từ URL param
  const storeData = { ...req.body, areaId }; // Gắn areaId vào storeData
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

const deleteStaff = asyncHandler(async (req, res) => {
  const store = await storeService.deleteStaff(req.params.storeId, req.body.staffIds);
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

const getStaffsOfTheStore = asyncHandler(async (req, res) => {
  const store = await storeService.getStaffsOfTheStore(req.params.id);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Get list of store's staffs successfully",
    store,
  });
});

const addManagerToStore = asyncHandler(async (req, res) => {
  const { managerId } = req.body;
  const store = await storeService.addManagerToStore(
    req.params.storeId,
    managerId
  );
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Update store manager successfully",
    store,
  });
});

const addStaffToStore = asyncHandler(async (req, res) => {
    const { staffId } = req.body;
    const store = await storeService.addStaffToStore(
      req.params.storeId,
      staffId
    );
    return res.status(HttpStatusCodes.OK.code).json({
      message: "Update store's staff successfully",
      store,
    });
  });

const changeStaffRole = asyncHandler(async (req, res) => {
  const { staffs } = req.body; // [{staffId, role}]
  const store = await storeService.changeStaffRole(
    req.params.storeId,
    staffs
  );
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Update staff's role successfully",
    store,
  });
})

module.exports = {
  createStore,
  updateStore,
  getStoresByAreaId,
  deleteStaff,
  getStaffsOfTheStore,
  addManagerToStore,
  addStaffToStore,
  changeStaffRole
};
