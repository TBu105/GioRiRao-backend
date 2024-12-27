const cityRepo = require('../repositories/city.repo');

const createCity = async (req, res) => {
    try {
        const city = await cityRepo.create(req.body);
        return res.status(201).json(city);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const city = await cityRepo.update(req.params.id, req.body);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        return res.json(city);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const city = await cityRepo.getById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        return res.json(city);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllCities = async (req, res) => {
    try {
        const cities = await cityRepo.getAll();
        return res.json(cities);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCitiesByHeadquarter = async (req, res) => {
    try {
        const cities = await cityRepo.getAllByHeadquarter(req.params.headquarterId);
        return res.json(cities);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const city = await cityRepo.softDelete(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        return res.json({ message: 'City deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCity,
    updateCity,
    getCityById,
    getAllCities,
    getCitiesByHeadquarter,
    deleteCity
}; 