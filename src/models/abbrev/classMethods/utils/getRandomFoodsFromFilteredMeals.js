import filteredFoods from '../../../../../data/filteredFoods.json';

const ids = Object.keys(filteredFoods);

const getRandomFoodsFromFilteredMeals = ({ startingFoods = {}, numFoods = 4 } = {}) => {
  const selectedFoods = { ...startingFoods };

  for (let i = 0; i < 100; i += 1) {
    const randomIx = Math.floor(Math.random() * ids.length);
    const foodId = ids[randomIx];

    selectedFoods[foodId] = filteredFoods[foodId];
    if (Object.keys(selectedFoods).length === numFoods) break;
  }

  return selectedFoods;
};

export default getRandomFoodsFromFilteredMeals;
