import sequelize from '../../conn';
import getterMethods from './getterMethods';
import { config } from './config';
import { syncAbbrevId } from './instanceMethods';

const AbbrevMicro = sequelize.define(
  'abbrevMicro',
  config,
  {
    getterMethods,
  },
);

AbbrevMicro.prototype.syncAbbrevId = syncAbbrevId;

export default AbbrevMicro;
