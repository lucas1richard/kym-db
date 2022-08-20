import sequelize from '../../conn';
import { config } from './config';

const Day = sequelize.define('day', config);

export default Day;
