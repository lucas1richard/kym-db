import associateModels from './associateModels';
import connect from './conn';
import * as foreignKeys from './foreignKeys';

const connectDatabase = () => {
  const sequelize = connect();
  const models = associateModels({ sequelize });

  return {
    forceSync: async () => sequelize.sync({ force: true }),
    sync: async () => sequelize.sync(),
    destroyAll: async () => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Restricted in prod');
      }
      await Promise.all(
        Object.values(models).map((model) => model.destroy({ where: {} })),
      );
    },
    closeConnection: () => sequelize.close(),
    sequelize,
    ...models,
  };
};

export {
  foreignKeys,
};

export default connectDatabase;
