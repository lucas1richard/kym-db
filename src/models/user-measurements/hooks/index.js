import { bmr } from '../utils/bmr';

const hooks = {
  beforeCreate(data) {
    const {
      age, gender, height, weight, units,
    } = data.get();
    let genderVal = 'male';
    if (gender) {
      genderVal = gender;
    }

    // eslint-disable-next-line no-param-reassign
    data.bmrTraditional = bmr(
      Number.parseFloat(age),
      genderVal.toLowerCase(),
      Number.parseFloat(height),
      Number.parseFloat(weight),
      units,
    );
    return data;
  },
};

export {

  hooks,
};
