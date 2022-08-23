import makeProgramObject from './classMethods/makeProgramObject';
import { config } from './config';

const makeProgram = ({ sequelize }) => {
  const Program = sequelize.define('program', config, {});

  Program.makeProgramObject = makeProgramObject;

  return Program;
};

export default makeProgram;
