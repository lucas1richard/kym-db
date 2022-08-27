import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { config } from './config';
import { hooks } from './hooks';
import { findAllByUserId } from './classMethods/findAllByUserId';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeUserMeasurements = ({ sequelize }) => {
  const UserMeasurements = sequelize.define('userMeasurement', config, {
    hooks,
  });

  UserMeasurements.findAllByUserId = findAllByUserId;

  return UserMeasurements;
};

export default makeUserMeasurements;
