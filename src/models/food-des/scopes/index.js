import FoodGroup from '../../food-group';

const defaultScope = {
  // include: [
  //   FoodGroup
  // ]
};

const scopes = {
  foodGroup: {
    include: [FoodGroup],
  },
};

export {
  defaultScope,
  scopes,
};
