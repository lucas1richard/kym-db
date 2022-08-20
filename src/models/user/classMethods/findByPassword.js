import assert from 'assert';
import md5 from 'crypto-md5';
import crypto from 'crypto';
import sequelize from '../../../conn';

const { Op } = sequelize;

export default findByPassword;

/**
 * Get the user from the password
 * @param {{ password: string }} credentials
 * @return {Promise}
 * @this user
 * @async
 */
async function findByPassword(credentials) {
  assert(!!credentials, 'No credentials provided');
  assert(!!credentials.password, 'Password must be included in credentials');
  assert.strict.notEqual(credentials.password.length, 0, 'Password cannot be an empty string');

  const cred = { ...credentials };
  cred.password = md5(credentials.password, 'hex');
  cred.email = {
    [Op.iLike]: credentials.email,
  };

  // get the salt
  const userInstance = await this.scope('').findOne({
    where: {
      email: {
        [Op.iLike]: credentials.email,
      },
    },
  });

  const { salt } = userInstance;
  const hash = crypto.createHmac('sha512', salt);
  hash.update(credentials.password);
  const value = hash.digest('hex');

  return this
    .scope('measurements', 'meal-goals')
    .findOne({
      where: {
        email: {
          [Op.iLike]: credentials.email,
        },
        password: value,
      },
    });
}
