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

const scopes = {
  // weight: {
  //   include: [Weight],
  // },
  // foodGroup: {
  //   include: [FoodDesc.scope('foodGroup')],
  // },
  // micro: {
  //   include: [AbbrevMicro],
  // },
  // all: {
  //   include: [
  //     Weight,
  //     AbbrevMicro,
  //     FoodDesc,
  //   ],
  // },
};

export {
  scopes,
  defaultScope,
};
