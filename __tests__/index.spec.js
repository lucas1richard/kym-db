import { connectDatabase } from '../src';
import connect from '../src/connect';

jest.mock('../src/connect', () => jest.fn(
  jest.requireActual('../src/connect'),
));
jest.mock('../src/buildModels', () => jest.fn(() => ({})));
jest.mock('../src/associateModels', () => jest.fn(() => ({})));
jest.mock('../src/addScopes', () => jest.fn(() => ({})));

const sync = jest.fn();

connect.mockImplementation(() => ({
  sync,
}));

describe('src/index', () => {
  beforeEach(jest.clearAllMocks);

  it('sync', async () => {
    const { sync: csync } = connectDatabase();
    await csync();
    expect(sync).toHaveBeenCalled();
  });

  it('forceSync', async () => {
    const { forceSync } = connectDatabase();
    await forceSync();
    expect(sync).toHaveBeenCalledWith({ force: true });
  });

  it('destroyAll wont work in production', async () => {
    process.env.NODE_ENV = 'production';

    try {
      const { destroyAll } = connectDatabase();
      await destroyAll();
    } catch (err) {
      expect(err.message).toBe('Restricted in prod');
    }

    process.env.NODE_ENV = 'test';
  });
});
