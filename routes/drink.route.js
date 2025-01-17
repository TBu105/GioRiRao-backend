const express = require('express');
const drinkController = require('../controllers/drink.controller');
const validate = require('../middlewares/validation.middleware');
const verifyAccessToken = require('../middlewares/verify.access.token.middleware');
const { uploadDisk } = require("../config/multer.config");
const authorize = require('../middlewares/authorize.middleware');
const { createDrinkSchema, updateDrinkSchema } = require('../validations/drink.validation');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Drinks
 *   description: API quản lý đồ uống
 */

/**
 * @swagger
 * /api/v1/drinks:
 *   get:
 *     summary: Lấy danh sách tất cả đồ uống
 *     tags: [Drinks]
 *     responses:
 *       200:
 *         description: Danh sách đồ uống
 */

/**
 * @swagger
 * /api/v1/drinks/{id}:
 *   get:
 *     summary: Lấy thông tin đồ uống theo ID
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đồ uống
 *     responses:
 *       200:
 *         description: Thông tin đồ uống
 */

/**
 * @swagger
 * /api/v1/drinks:
 *   post:
 *     summary: Tạo đồ uống mới
 *     tags: [Drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               name:
 *                 type: string
 *                 example: Coffee
 *               price:
 *                 type: number
 *                 example: 30.5
 *     responses:
 *       201:
 *         description: Đồ uống được tạo thành công
 */

/**
 * @swagger
 * /api/v1/drinks/{id}:
 *   put:
 *     summary: Cập nhật đồ uống
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đồ uống cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Coffee Updated
 *               price:
 *                 type: number
 *                 example: 35
 *     responses:
 *       200:
 *         description: Đồ uống được cập nhật thành công
 */

/**
 * @swagger
 * /api/v1/drinks/delete/{id}:
 *   put:
 *     summary: Xóa mềm đồ uống
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đồ uống cần xóa
 *     responses:
 *       200:
 *         description: Đồ uống đã bị xóa
 */
router.post('/', uploadDisk.fields([
    { name: 'thumbnail', maxCount: 1 },  // Chỉ chấp nhận 1 file cho 'thumbnail'
    { name: 'images', maxCount: 10 }     // Chấp nhận tối đa 10 file cho 'images'
]), validate(createDrinkSchema), drinkController.createDrink);
router.put('/:id', verifyAccessToken, authorize(["admin"]), drinkController.updateDrink);
router.get('/', drinkController.getAllDrinks);
router.get('/:id', drinkController.getDrinkById);
router.put('/delete/:id', verifyAccessToken, authorize(["admin"]), drinkController.deleteDrink);
router.get('/:id/ingredients-recipe', drinkController.getIngredientsRecipe);
router.get('/name/:name', drinkController.getDrinkByName);
router.get('/category/:category', drinkController.getDrinkByCategory)

module.exports = router;