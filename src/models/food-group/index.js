import sequelize from '../../conn';
import { config } from './config';

const FoodGroup = sequelize.define('foodGroup', config);

export default FoodGroup;
