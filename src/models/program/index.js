import sequelize from '../../conn';
import makeProgramObject from './classMethods/makeProgramObject';
import { config } from './config';

const Program = sequelize.define('program', config, {});

Program.makeProgramObject = makeProgramObject;

export default Program;
