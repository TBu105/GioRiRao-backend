const areaRepo = require('../repositories/area.repo');

const createArea = async (req, res) => {
    try {
        const area = await areaRepo.create(req.body);
        return res.status(201).json(area);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateArea = async (req, res) => {
    try {
        const area = await areaRepo.update(req.params.id, req.body);
        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }
        return res.json(area);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAreaById = async (req, res) => {
    try {
        const area = await areaRepo.getById(req.params.id);
        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }
        return res.json(area);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllAreas = async (req, res) => {
    try {
        const areas = await areaRepo.getAll();
        return res.json(areas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAreasByCity = async (req, res) => {
    try {
        const areas = await areaRepo.getAllByCity(req.params.cityId);
        return res.json(areas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteArea = async (req, res) => {
    try {
        const area = await areaRepo.softDelete(req.params.id);
        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }
        return res.json({ message: 'Area deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createArea,
    updateArea,
    getAreaById,
    getAllAreas,
    getAreasByCity,
    deleteArea
}; 