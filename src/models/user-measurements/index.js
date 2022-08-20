import sequelize from '../../conn';
import { config } from './config';
import { hooks } from './hooks';
import { findAllByUserId } from './classMethods/findAllByUserId';

const UserMeasurements = sequelize.define('userMeasurement', config, {
  hooks,
});

UserMeasurements.findAllByUserId = findAllByUserId;

export default UserMeasurements;
