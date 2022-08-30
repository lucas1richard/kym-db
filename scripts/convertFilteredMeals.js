const filteredMeals = require('../data/filteredmeals.json');

const obj = {};

filteredMeals.forEach((day) => {
  day.forEach((meal) => {
    meal.forEach((food) => {
      obj[food.id] = food;
    });
  });
});

console.log(JSON.stringify(obj, undefined, 2));
