import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import getterMethods from './getterMethods';
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeAbbrevMicro = ({ sequelize }) => {
  const AbbrevMicro = sequelize.define(
    'abbrevMicro',
    config,
    {
      getterMethods,
    },
  );

  return AbbrevMicro;
};

export default makeAbbrevMicro;
