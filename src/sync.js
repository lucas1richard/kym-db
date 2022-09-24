import { connectDatabase } from './index';

const { sequelize } = connectDatabase();

let options;
if (process.env.FORCE_DB_SYNC) {
  options = {
    force: true,
  };
}

async function sync() {
  await sequelize.sync(options);
  process.exit();
}

sync();
