import { config } from './config';

const makeDay = ({ sequelize }) => sequelize.define('day', config);

export default makeDay;
