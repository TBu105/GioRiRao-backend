const headquarterRepo = require('../repositories/headquarter.repo');

const createHeadquarter = async (req, res) => {
  try {
    const headquarter = await headquarterRepo.create(req.body);
    return res.status(201).json(headquarter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateHeadquarter = async (req, res) => {
  try {
    const headquarter = await headquarterRepo.update(req.params.id, req.body);
    if (!headquarter) {
      return res.status(404).json({ message: 'Headquarter not found' });
    }
    return res.json(headquarter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getHeadquarterById = async (req, res) => {
  try {
    const headquarter = await headquarterRepo.getById(req.params.id);
    if (!headquarter) {
      return res.status(404).json({ message: 'Headquarter not found' });
    }
    return res.json(headquarter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteHeadquarter = async (req, res) => {
  try {
    const headquarter = await headquarterRepo.softDelete(req.params.id);
    if (!headquarter) {
      return res.status(404).json({ message: 'Headquarter not found' });
    }
    return res.json({ message: 'Headquarter deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHeadquarter,
  updateHeadquarter,
  getHeadquarterById,
  deleteHeadquarter
};
