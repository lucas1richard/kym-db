import { USER } from '../../../foreignKeys';

/**
 * Find all meals for a given date
 * @param {string} date
 * @param {number} uuid
 * @this meal
 */
function findByDate({ date, uuid, Abbrev }) {
  if (!uuid) throw new Error('NO_USER_SPECIFIED');
  const dt = new Date(date);

  return this.findAll({
    where: {
      Date: dt,
      [USER]: uuid,
    },
    include: [Abbrev],
  });
}

export default findByDate;
