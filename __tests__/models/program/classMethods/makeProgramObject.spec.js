import moment from 'moment';
import { connectDatabase } from '../../../../src';
import { USER } from '../../../../src/foreignKeys';

const { Program, destroyAll, closeConnection } = connectDatabase();

describe('models/Program/classMethods/makeProgramObject', () => {
  beforeAll(async () => {});
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('makes a program object - gain weight', () => {
    const obj = Program.makeProgramObject({
      units: 'IMPERIAL',
      weight: '150',
      goal: 'GAIN_MUSCLE',
      uuid: '123',
    });
    expect(obj.startweight).toBe(150);
    expect(obj.endgoal).toBe(155);
    expect(obj.startdate).toBe(moment().format('YYYY-MM-DD'));
    expect(obj.enddate).toBe(moment().add(35, 'days').format('YYYY-MM-DD'));
    expect(obj.result).toBe('TBD');
    expect(obj[USER]).toBe('123');
  });
  it('makes a program object - lose weight', () => {
    const obj = Program.makeProgramObject({
      units: 'METRIC',
      weight: '150',
      goal: 'LOSE_WEIGHT',
      uuid: '123',
    });
    expect(obj.startweight).toBe(150);
    expect(obj.endgoal).toBe(147.7);
    expect(obj.startdate).toBe(moment().format('YYYY-MM-DD'));
    expect(obj.enddate).toBe(moment().add(35, 'days').format('YYYY-MM-DD'));
    expect(obj.result).toBe('TBD');
    expect(obj[USER]).toBe('123');
  });
});
