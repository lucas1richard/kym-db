const filteredMeals = require('../data/filteredmeals.json');

const arr = [];

filteredMeals.forEach((day) => {
  day.forEach((meal) => {
    const ids = meal.map((food) => food.id);
    arr.push(ids);
  });
});

console.log(JSON.stringify(arr, undefined, 2));
