import { bmr } from '../utils/bmr';

const hooks = {
  beforeCreate(data) {
    const {
      age, gender, height, weight, units,
    } = data.get();

    // eslint-disable-next-line no-param-reassign
    data.bmrTraditional = bmr({
      age: Number.parseFloat(age),
      genderString: gender.toUpperCase(),
      heightNumber: Number.parseFloat(height),
      weightNumber: Number.parseFloat(weight),
      units,
    });
    return data;
  },
};

export {
  hooks,
};
