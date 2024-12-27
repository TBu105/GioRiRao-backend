const storeRepo = require('../repositories/store.repo');

const createStore = async (req, res) => {
    try {
        const store = await storeRepo.create(req.body);
        return res.status(201).json(store);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateStore = async (req, res) => {
    try {
        const store = await storeRepo.update(req.params.id, req.body);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.json(store);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getStoreById = async (req, res) => {
    try {
        const store = await storeRepo.getById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.json(store);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllStores = async (req, res) => {
    try {
        const stores = await storeRepo.getAll();
        return res.json(stores);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getStoresByArea = async (req, res) => {
    try {
        const stores = await storeRepo.getAllByArea(req.params.areaId);
        return res.json(stores);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        const store = await storeRepo.softDelete(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.json({ message: 'Store deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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