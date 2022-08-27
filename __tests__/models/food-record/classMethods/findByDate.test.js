import { findByDate } from '../../../../src/models/food-record/classMethods';

describe('findByDate', () => {
  const model = {
    scope() {
      return this;
    },
    findAll() {
      return [];
    },
    findByDate,
  };

  it('should be okay with date and uuid', () => {
    const allResults = model.findByDate({ date: '2018-01-01', uuid: '1' });
    expect(allResults).toEqual([]);
  });
  it('should throw an error without a date', () => {
    try {
      model.findByDate({ date: null, uuid: '1' });
    } catch (err) {
      expect(err.message).toBe('date should be a string');
    }
  });
  it('should throw an error without a uuid', () => {
    try {
      model.findByDate({ date: '2018-01-01', uuid: undefined });
    } catch (err) {
      expect(err.message).toBe('No uuid specified');
    }
  });
});
