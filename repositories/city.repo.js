const City = require("../models/City");

// Tạo thành phố mới
const createCity = async (cityData) => {
  const city = new City(cityData);
  return await city.save();
};

const bulkWriteCities = async (bulkOperations, session) => {
  return await City.bulkWrite(bulkOperations, { session });
};

const findCityByName = async (name) => {
  return await City.findOne({ name, deleted: false }).lean();
};

const findCitiesByName = async (names, session) => {
  // Tìm tất cả thành phố có tên trong names array
  // names: ['city1', 'city2']
  const cities = await City.find({
    name: { $in: names },
    deleted: false,
  })
    .session(session)
    .lean();

  /**
   * cities result: [
  { _id: 'abc123', name: 'city 1'},
  { _id: 'def456', name: 'city 2' }
]
   */
  return cities;
};

const findCityById = async (id) => {
  return await City.findById(id, { deleted: false }).lean();
};

const findAllCities = async () => {
  return await City.find({ deleted: false }).lean();
};

const updateCityById = async (id, updateData) => {
  return await City.findByIdAndUpdate(id, updateData, {
    new: true,
    deleted: false,
  });
};

module.exports = {
  createCity,
  bulkWriteCities,
  findCityByName,
  findCitiesByName,
  findCityById,
  findAllCities,
  updateCityById,
};
