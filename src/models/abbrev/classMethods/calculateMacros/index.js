/**
 * @module models/abbrev/classMethods/calculateMacros
 */

import FoodFactor from '../utils/FoodFactor';
import formatResults from './formatResults';

/**
 * Calculate macronutrients
 * @param {object} obj
 * @param {{proteinGoal: number, carbGoal: number, fatGoal: number}} obj.goals - Macronutrient goals
 * @param {Array<number>} obj.abbrevIds - food id
 * @param {Array<abbrevType>} [obj._foods] - array of foods
 * @param {boolean} [obj.sensitive] - prevent huge meals from being returned
 */
async function calculateMacros({
  goals, abbrevIds, _foods, sensitive,
}) {
  let start;
  const {
    proteinGoal,
    carbGoal,
    fatGoal,
  } = goals;

  // Don't allow invalid goals
  if (proteinGoal <= 0 || carbGoal <= 0 || fatGoal <= 0) {
    return {
      error: 'INVALID_GOAL_MACRONUTRIENTS_ZERO',
    };
  }

  // Get the foods
  if (_foods) start = await Promise.resolve(_foods);
  else start = await this.findAll({ where: { id: abbrevIds } });

  const factors = new FoodFactor(start);

  /* istanbul ignore next */
  if (factors.status === 'fail') {
    return {
      error: 'NO_FOODS_PROVIDED',
    };
  }

  const { alpha, beta, gamma } = factors.calculateMealWeights(
    proteinGoal,
    carbGoal,
    fatGoal,
  );

  const proteinFoodWeight = Math.round(alpha);
  const carbFoodWeight = Math.round(beta);
  const fatFoodWeight = Math.round(gamma);

  const result = [
    formatResults(proteinFoodWeight, factors.pFood),
    formatResults(carbFoodWeight, factors.cFood),
    formatResults(fatFoodWeight, factors.fFood),
  ];

  const hasHighQuantity = [proteinFoodWeight, carbFoodWeight, fatFoodWeight]
    .some((num) => num > 400);

  if (sensitive && hasHighQuantity) return { error: 'HIGH_QUANTITY_WARNING', result };

  if (proteinFoodWeight >= 0 && carbFoodWeight >= 0 && fatFoodWeight >= 0) return { result };

  return {
    error: 'UNABLE_TO_CALCULATE_WITH_FOODS',
    factors,
    result,
  };
}

export default calculateMacros;
