import { config } from './config';

const makeFoodGroup = ({ sequelize }) => sequelize.define('foodGroup', config);

export default makeFoodGroup;
