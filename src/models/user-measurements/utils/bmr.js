/**
 * Calculates the basal metabolic rate
 * @param {object} obj
 * @param {number} obj.age
 * @param {'MALE'|'FEMALE'} obj.genderString
 * @param {number} obj.heightNumber
 * @param {number} obj.weightNumber
 * @param {'IMPERIAL'|'METRIC'} obj.units
 * @returns {number}
 */
function bmr({
  age, genderString, heightNumber, weightNumber, units,
}) {
  const gender = genderString === 'MALE' ? 5 : -161;
  const height = units === 'IMPERIAL' ? (2.54 * heightNumber) / 100 : heightNumber / 100;
  const weight = units === 'IMPERIAL' ? weightNumber * 0.45359237 : weightNumber;

  return Math.round(((10 * weight) + (625 * height) + gender) - (5 * age));
}

export {
  bmr,
};
