// import FoodGroup from '../../food-group';

const defaultScope = {
  // include: [
  //   FoodGroup
  // ]
};

const addFoodDescScopes = ({ models }) => {
  const { FoodGroup, FoodDesc, Abbrev } = models;

  const scopes = {
    withFoodGroup: {
      include: [FoodGroup],
    },
    withAbbrev: {
      include: [Abbrev],
    },
  };

  Object.entries(scopes).forEach(([scopeName, scopeVal]) => {
    FoodDesc.addScope(scopeName, scopeVal);
  });
};

export {
  defaultScope,
  addFoodDescScopes,
};
