// import Weight from '../weight';
// import AbbrevMicro from '../abbrev-micro';
// import FoodDesc from '../food-des';

const defaultScope = {
  include: [
    // Weight,
    // // AbbrevMicro,
    // FoodDesc,
  ],
};

const addAbbrevScopes = ({ models }) => {
  const {
    Weight, FoodDesc, FoodGroup, AbbrevMicro, Abbrev,
  } = models;

  const scopes = {
    withWeight: {
      include: [Weight],
    },
    withFoodGroup: {
      include: [{
        model: FoodDesc,
        include: [FoodGroup],
      }],
    },
    withMicro: {
      include: [AbbrevMicro],
    },
    withAll: {
      include: [
        Weight,
        AbbrevMicro,
        FoodDesc,
      ],
    },
  };

  Object.entries(scopes).forEach(([scopeName, scopeVal]) => {
    Abbrev.addScope(scopeName, scopeVal);
  });
};

export {
  addAbbrevScopes,
  defaultScope,
};
