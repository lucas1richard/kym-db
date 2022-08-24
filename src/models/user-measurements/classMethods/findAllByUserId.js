import { USER } from '../../../foreignKeys';

/**
 * @param {object} param0
 * @param {string} param0.uuid identifies the user
 * @returns
 */
async function findAllByUserId({ uuid }) {
  const measurements = await this.findAll({
    where: {
      [USER]: uuid,
    },
    order: [
      ['date', 'DESC'],
    ],
  });
  return measurements;
}

export {
  findAllByUserId,
};
