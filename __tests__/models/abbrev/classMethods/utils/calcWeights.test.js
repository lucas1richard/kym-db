import calculateMealWeights from '../../../../../src/models/abbrev/classMethods/utils/calculateMealWeights';

function makeFactor(p, c, f) {
  return {
    p, c, f, weight: 100,
  };
}

describe('calcWeight', () => {
  const factors = {
    pFood: makeFactor(25, 0, 5),
    cFood: makeFactor(1, 10, 0),
    fFood: makeFactor(1, 3, 14),
  };
  const pGoal = 20;
  const cGoal = 30;
  const fGoal = 10;

  it('calculates weights', () => {
    const weights = calculateMealWeights(factors, pGoal, cGoal, fGoal);
    expect(weights).toBeTruthy(); // eslint-disable-line
    expect(weights.alpha).toBeCloseTo(66.7, 0.3);
    expect(weights.beta).toBeCloseTo(285.7, 0.3);
    expect(weights.gamma).toBeCloseTo(47.6, 0.3);
  });
});
