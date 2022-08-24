import getterMethods from './getterMethods';
import { config } from './config';
import { syncAbbrevId } from './instanceMethods';

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
  AbbrevMicro.prototype.syncAbbrevId = syncAbbrevId;

  return AbbrevMicro;
};

export default makeAbbrevMicro;
