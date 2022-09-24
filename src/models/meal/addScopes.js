// import FoodRecord from '../../food-record';
const addMealScopes = ({ models }) => {
  const { FoodRecord, Meal, Abbrev } = models;
  const scopes = {
    withRecords: {
      include: [{
        model: FoodRecord,
        include: [Abbrev],
      }],
    },
  };
  Object.entries(scopes).forEach(([scopeName, scopeVal]) => {
    Meal.addScope(scopeName, {
      ...scopeVal,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  });
};

export {
  addMealScopes,
};
