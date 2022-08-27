import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeDay = ({ sequelize }) => sequelize.define('day', config);

export default makeDay;
