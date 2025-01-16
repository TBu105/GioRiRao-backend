const Agenda = require('agenda');
const drinkRepo = require('../repositories/drink.repo');
const { db: { password, name }, } = require("./server.config");
// Kết nối tới MongoDB
const agenda = new Agenda({
    db: { address: `mongodb+srv://admin:${password}@cluster-mongodb-lp.dh9rwqr.mongodb.net/${name}?retryWrites=true&w=majority&appName=Cluster-MongoDB-LP`, collection: 'Drinks' },
    processEvery: '1 hours', // Tần suất quét các công việc
});

// Khởi tạo các công việc
agenda.define('set isNew to false', async (job) => {
    console.log("Data here", job.attrs.data);
    const { id } = job.attrs.data;
    await drinkRepo.updateDrinkById(id, { isNew: false });
});

(async function () {
    await agenda.start();
    console.log('Agenda started!');
})();

module.exports = agenda;
