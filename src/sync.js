import conn from './connect';

let options;
if (process.env.FORCE_DB_SYNC) {
  options = {
    force: true,
  };
}

async function sync() {
  await conn.sync(options);
  process.exit();
}

sync();
