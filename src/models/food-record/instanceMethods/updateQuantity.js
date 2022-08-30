/**
 * Revise the quantity of a record
 * @param {Object} quant
 * @param {number} quant.quantity
 * @param {string} quant.seq
 * @return {Promise}
 * @this foodRecord (instance)
 */
function updateQuantity({ quantity, seq }) {
  this.quantity = quantity;
  this.unit = seq;
  return this.save();
}

export default updateQuantity;
