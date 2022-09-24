// import Abbrev from '../../abbrev';

const defaultScope = {
  // include: [
  //   Abbrev,
  // ],
};

const addFoodRecordScopes = ({ models }) => {
  const {
    Abbrev, AbbrevMicro, FoodDesc, FoodRecord, Weight,
  } = models;

  const scopes = {
    withMicro: {
      include: [
        {
          model: Abbrev,
          include: [
            AbbrevMicro,
            Weight,
          ],
        },
      ],
    },
    withMacros: {
      include: [
        {
          model: Abbrev,
          include: [{
            model: Weight,
            order: [['id', 'INC']],
          }],
        },
      ],
    },
    withDescription: {
      include: [
        {
          model: Abbrev,
          include: [
            Weight,
            AbbrevMicro,
            FoodDesc,
          ],
        },
      ],
    },
  };

  Object.entries(scopes).forEach(([scopeName, scopeVal]) => {
    FoodRecord.addScope(scopeName, {
      ...scopeVal,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  });
};

export {
  defaultScope,
  addFoodRecordScopes,
};
