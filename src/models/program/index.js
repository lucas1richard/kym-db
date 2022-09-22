import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import makeProgramObject from './classMethods/makeProgramObject';
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeProgram = ({ sequelize }) => {
  const Program = sequelize.define('program', config, {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });

  Program.makeProgramObject = makeProgramObject;

  return Program;
};

export default makeProgram;
