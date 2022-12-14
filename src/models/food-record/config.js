import Sequelize from 'sequelize';

const foodRecordKeys = {
  DATE: 'date',
  MEAL: 'meal',
  QUANTITY: 'quantity',
  UNIT: 'unit',
  FROM_PROGRAM: 'fromprogram',
  CONFIRMED: 'confirmed',
};

const config = {
  [foodRecordKeys.DATE]: {
    type: Sequelize.DATEONLY,
  },
  [foodRecordKeys.MEAL]: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  [foodRecordKeys.QUANTITY]: {
    type: Sequelize.DECIMAL,
  },
  [foodRecordKeys.UNIT]: {
    type: Sequelize.INTEGER,
  },
  [foodRecordKeys.FROM_PROGRAM]: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  [foodRecordKeys.CONFIRMED]: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
};

export {
  config,
  foodRecordKeys,
};
