import maxMacro from '../../../../src/models/abbrev/getterMethods/maxMacro';

describe('maxMacro', () => {
  it('sorts when all values are different', () => {
    const item = {
      protein: 5,
      carbohydrates: 6,
      fat: 4,
      maxMacro,
    };
    expect(item.maxMacro()).toBe('carbohydrates');
  });

  it('sorts when some values are the same', () => {
    const item = {
      protein: 6,
      carbohydrates: 6,
      fat: 4,
      maxMacro,
    };
    expect(item.maxMacro()).toBe('protein');
  });
});
