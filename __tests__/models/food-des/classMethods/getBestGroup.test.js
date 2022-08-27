import getBestGroup from '../../../../src/models/food-des/classMethods/getBestGroup';

describe('getBestGroup', () => {
  it('is okay', () => {
    const group = getBestGroup([{
      foodGroup: { Description: 'Chicken chicken' },
    }, {
      foodGroup: { Description: 'Test test' },
    }, {
      foodGroup: { Description: 'Test test' },
    }]);
    expect(group).toBeTruthy(); // eslint-disable-line
  });
  it('throws an error when foods are an empty array', () => {
    try {
      getBestGroup([]);
    } catch (err) {
      expect(err.message).toBe('No similar foods found');
    }
  });
});
