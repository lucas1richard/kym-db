const users = require('./test-data/users.json');
const abbrevs = require('./test-data/abbrev.json');
const foodRecords = require('./test-data/food-record.json');
const abbrevsMicro = require('./test-data/abbrev-micro.json');
const meals = require('./test-data/meals.json');

global.testData = {
  users,
  abbrevs,
  abbrevsMicro,
  foodRecords,
  meals,
};
