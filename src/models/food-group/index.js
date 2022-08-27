import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model<{}>}
 */
const makeFoodGroup = ({ sequelize }) => sequelize.define('foodGroup', config);

export default makeFoodGroup;
