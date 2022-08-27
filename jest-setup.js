const users = require('./test-data/users.json');
const userMeasurements = require('./test-data/user-measurements.json');
const abbrevs = require('./test-data/abbrev.json');
const foodRecords = require('./test-data/food-record.json');
const abbrevsMicro = require('./test-data/abbrev-micro.json');
const meals = require('./test-data/meals.json');
const weights = require('./test-data/weight.json');

global.testData = {
  users,
  userMeasurements,
  abbrevs,
  abbrevsMicro,
  foodRecords,
  meals,
  weights,
};
