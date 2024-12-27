const storeRepo = require('../repositories/store.repo');
const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');

const createStore = async (req, res) => {
    try {
        const store = await storeRepo.createStore(req.body);
        return res.status(StatusCodes.CREATED).json({
            status: ReasonPhrases.CREATED,
            store
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

const updateStore = async (req, res) => {
    try {
        const store = await storeRepo.updateStore(req.params.id, req.body);
        if (!store) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                message: 'Store not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            store
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

const getStoreById = async (req, res) => {
    try {
        const store = await storeRepo.getStoreById(req.params.id);
        if (!store) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                message: 'Store not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            store
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

const getAllStores = async (req, res) => {
    try {
        const stores = await storeRepo.getAllStores();
        return res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            stores
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

const getStoresByArea = async (req, res) => {
    try {
        const stores = await storeRepo.getStoresByArea(req.params.areaId);
        return res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            stores
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

const deleteStore = async (req, res) => {
    try {
        const store = await storeRepo.softDeleteStore(req.params.id);
        if (!store) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                message: 'Store not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'Store deleted successfully'
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

module.exports = {
    createStore,
    updateStore,
    getStoreById,
    getAllStores,
    getStoresByArea,
    deleteStore
}; 