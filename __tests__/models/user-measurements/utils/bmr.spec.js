import { bmr } from '../../../../src/models/user-measurements/utils/bmr';

describe('bmr', () => {
  it('calculates bmr based on inputs -male -imperial', () => {
    const res = bmr({
      age: 30,
      genderString: 'MALE',
      heightNumber: 73.25,
      weightNumber: 175,
      units: 'IMPERIAL',
    });
    expect(typeof res).toBe('number');
  });
  it('calculates bmr based on inputs -female -metric', () => {
    const res = bmr({
      age: 30,
      genderString: 'FEMALE',
      heightNumber: 73.25,
      weightNumber: 175,
      units: 'METRIC',
    });
    expect(typeof res).toBe('number');
  });
});
