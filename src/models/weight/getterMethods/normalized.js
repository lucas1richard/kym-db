/**
 * Provide a more readable version of the instance
 * @return {{ val: number, txt: string }}
 * @this weight (instance)
 */
function normalized() {
  return {
    val: this.seq,
    txt: `${this.description} (${Math.round((this.gr_wgt / this.amount) * 10) / 10} g)`,
    weight: Math.round((this.gr_wgt / this.amount) * 10) / 10,
  };
}

export default normalized;
