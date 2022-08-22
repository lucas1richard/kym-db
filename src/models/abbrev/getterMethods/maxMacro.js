/**
 * Find out the maximum macronutrient
 * @this abbrev
 * @return {string}
 */
function maxMacro() {
  let arr = [{
    macro: 'Protein',
    value: Number.parseFloat(this.Protein),
  }, {
    macro: 'Carbohydrates',
    value: Number.parseFloat(this.Carbohydrates),
  }, {
    macro: 'Fat',
    value: Number.parseFloat(this.Fat),
  }];

  arr = arr.sort((a, b) => {
    if (a.value > b.value) return -1;
    if (a.value < b.value) return 1;
    return 0;
  });

  return arr[0].macro;
}
export default maxMacro;
