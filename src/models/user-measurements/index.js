import { config } from './config';
import { hooks } from './hooks';
import { findAllByUserId } from './classMethods/findAllByUserId';

const makeUserMeasurements = ({ sequelize }) => {
  const UserMeasurements = sequelize.define('userMeasurement', config, {
    hooks,
  });

  UserMeasurements.findAllByUserId = findAllByUserId;

  return UserMeasurements;
};

export default makeUserMeasurements;
