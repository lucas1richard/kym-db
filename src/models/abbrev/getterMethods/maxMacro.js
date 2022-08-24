/**
 * Find out the maximum macronutrient
 * @this abbrev
 * @return {string}
 */
function maxMacro() {
  const arr = [{
    macro: 'protein',
    value: Number.parseFloat(this.protein),
  }, {
    macro: 'carbohydrates',
    value: Number.parseFloat(this.carbohydrates),
  }, {
    macro: 'fat',
    value: Number.parseFloat(this.fat),
  }];

  arr.sort((a, b) => {
    if (a.value > b.value) return -1;
    if (a.value < b.value) return 1;
    return 0;
  });

  return arr[0].macro;
}
export default maxMacro;
