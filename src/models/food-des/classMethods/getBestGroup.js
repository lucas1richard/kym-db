/**
 * @module models/food-des/classMethods/bestFoodGroup
 */

/**
 * Determine the best food group for a food string
 * @this food-des
 * @return {{ name: string, group: string, err: string }}
 */
function getBestGroup(foods) {
  /** If there are no similar foods, say that there are none */
  if (foods.length === 0) {
    throw new Error('No similar foods found');
  }

  /** keys are descriptions */
  const countHash = {};
  foods.forEach((indFood) => {
    const { foodGroup: { description } } = indFood;
    if (!countHash[description]) {
      countHash[description] = {
        group: indFood.FdGrp_Cd,
        count: 1,
      };
    } else {
      countHash[description].count += 1;
    }
  });

  const countHashVals = Object.keys(countHash).map((key) => countHash[key]);
  const maxCount = Math.max.apply(null, countHashVals.map((obj) => obj.count));
  const chosenGroup = Object.keys(countHash).find((key) => countHash[key].count === maxCount);

  return {
    name: chosenGroup,
    group: countHash[chosenGroup].group,
  };
}

export default getBestGroup;
