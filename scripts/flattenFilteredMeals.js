const filteredMeals = require('../data/filteredmeals.json');

const arr = [];

filteredMeals.forEach((day) => {
  day.forEach((meal) => {
    meal.forEach((food) => {
      arr.push(food);
    });
  });
});

console.log(JSON.stringify(arr, undefined, 2));
