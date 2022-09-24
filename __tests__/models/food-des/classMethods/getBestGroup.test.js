import getBestGroup from '../../../../src/models/food-des/classMethods/getBestGroup';

describe('getBestGroup', () => {
  it('is okay', () => {
    const group = getBestGroup([{
      foodGroup: { description: 'Chicken chicken' },
    }, {
      foodGroup: { description: 'Test test' },
    }, {
      foodGroup: { description: 'Test test' },
    }]);
    expect(group).toBeTruthy(); // eslint-disable-line
  });
  it('throws an error when foods are an empty array', () => {
    try {
      getBestGroup([]);
    } catch (err) {
      expect(err.message).toBe('NO_GROUP_FOUND');
    }
  });
});
