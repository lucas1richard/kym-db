import assert from 'assert';
// import md5 from 'crypto-md5';
import crypto from 'crypto';
import sequelize from '../../../conn';

const { Op } = sequelize;

export const errorMessages = {
  NO_CREDENTIALS_PROVIDED: 'NO_CREDENTIALS_PROVIDED',
  PASSWORD_NOT_INCLUDED: 'PASSWORD_NOT_INCLUDED',
  EMAIL_NOT_INCLUDED: 'EMAIL_NOT_INCLUDED',
};

/**
 * Get the user from the password
 * @param {{ password: string }} credentials
 * @return {Promise}
 * @this user
 * @async
 */
async function findByPassword(credentials) {
  assert(!!credentials, errorMessages.NO_CREDENTIALS_PROVIDED);
  assert(!!credentials.password, errorMessages.PASSWORD_NOT_INCLUDED);
  assert(!!credentials.email, errorMessages.EMAIL_NOT_INCLUDED);

  // const cred = {
  //   ...credentials,
  //   password: md5(credentials.password, 'hex'),
  //   email: {
  //     [Op.iLike]: credentials.email,
  //   },
  // };

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

export default findByPassword;
