const cityRepository = require("../repositories/city.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");
const mongoose = require("mongoose");

const createCity = async (cityData) => {
  const existingCity = await cityRepository.findCity(
    {name: cityData.name},
  );
  if (existingCity) {
    throw new BadRequest("City with this name already exists.");
  }
  return await cityRepository.createCity(cityData);
};

const createCitiesInBulk = async (citiesData) => {
  const session = await mongoose.startSession();

  try {
    // Start a transaction
    session.startTransaction();

    /**
     * Kiểm tra thành phố đã tồn tại hay chưa
     * Ta không chạy vòng lặp để kiểm tra từng thành phố như thế nào
     * for (citieData in citiesData) {
     *  const existingCity = await cityRepository.findCityByName(cityData.name, session);
     * }
     * bởi vì nó sẽ tạo ra nhiều request đến database, dẫn đến tốn thời gian
     *
     * Ta sử dụng
     * citiesData.map(city => city.name) convert dữ liệu từ
     * [{name: 'city1'}, {name: 'city2'}] => ['city1', 'city2']
     *
     * sau đó truyền xuống array cho repo
     * repo sẽ sử dụng $in operator để tìm tất cả thành phố có tên trong array
     * làm như vậy ta chỉ cần 1 request đến database
     * sẽ nhanh hơn rất nhiều so với việc gọi từng request
     */
    /**
   * existingCities result: [
        { _id: 'abc123', name: 'city 1'},
        { _id: 'def456', name: 'city 2' }
      ] nếu city 1, 2 đã tồn tại trong db

      
   */
    const existingCities = await cityRepository.findCitiesByName(
      citiesData.map((city) => city.name),
      session
    );

    if (existingCities.length !== 0) {
      throw new BadRequest(`Cities with this name already exists.`);
    }
    /**Tiếp theo chúng ta sẽ loại bỏ trùng lặp trong dữ liệu đầu vào
     * cities.map((city) => city.name)
     * convert dữ liệu từ 
          * [
        { "name": "Hà Nội" },
        { "name": "Hồ Chí Minh" },
        { "name": "Đà Nẵng" },
        { "name": "Đà Nẵng" },
      ]
        thành
          * ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Đà Nẵng", "Vĩnh Long"]

        filter lọc dữ liêu trùng lặp từ ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Đà Nẵng"]
        thành ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"]
     */

    /**
     * Giải thích cách hoạt động của filter
     * Nó kiểm tra nếu điều kiện được thỏa thì thêm dữ liệu vào array
     * Nếu không thỏa thì bỏ qua
     *
     * Đầu tiên nó kiểm tra với value = "Hà Nội" thì indexOf của "Hà Nội" là 0
     * bắt đầu so sánh với index
     * indexOf của Hà Nội = index => true, thêm Hà nội vào array trả về
     * tương tự với Hồ Chí Minh và Đà Nẵng đầu tiên
     * Tới Đà Nẵng thứ 2, ta có indexOf của Đà Nẵng là 2 nhưng index là 3
     * indexOf của Đà Nẵng != index => false, bỏ qua
     */
    let removeDuplicate = citiesData
      .map((city) => city.name)
      .filter((value, index, self) => self.indexOf(value) === index);

    /**
     * Bây giờ chúng ta sẽ bulk write vào database
     * ta convert ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"] thành
     * [
          { insertOne: { document: {name: "Hà Nội"} } },
          { insertOne: { document: "Hồ Chí Minh" } },
          { insertOne: { document: "Đà Nẵng" } }
        ]

      sử dụng removeDuplicate.map(city => ({insertOne: {document: city}}))
     */

    const bulkOperations = removeDuplicate.map((city) => ({
      insertOne: {
        document: { name: city },
      },
    }));

    const cities = await cityRepository.bulkWriteCities(
      bulkOperations,
      session
    );

    await session.commitTransaction();

    return cities;
  } catch (error) {
    // If an error occurs, abort the transaction
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session
    session.endSession();
  }
};

const updateCity = async (id, updateData) => {
  if (updateData.hasOwnProperty("deleted")) {
    throw new BadRequest("The 'deleted' field cannot be updated directly.");
  }
  const updatedCity = await cityRepository.updateCityById(id, updateData);
  if (!updatedCity) {
    throw new NotFound("City not found.");
  }
  return updatedCity;
};

const getAllCities = async () => {
  return await cityRepository.findAllCities();
};

const getCityById = async (id) => {
  const city = await cityRepository.findCityById(id);
  if (!city) {
    throw new NotFound("City not found.");
  }
  return city;
};

module.exports = {
  createCity,
  updateCity,
  getAllCities,
  getCityById,
  createCitiesInBulk,
};
