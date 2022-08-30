function weightInGrams(weight, quantity) {
  return Math.round((weight.gr_wgt / weight.amount) * Number.parseFloat(quantity));
}

async function calMacros() {
  /** The raw data for the record */
  const { abbrev } = this;

  if (!abbrev) {
    throw new Error('NO_ABBREV_FOUND');
  }
  if (!abbrev.weights) {
    throw new Error('NO_ABBREV_WEIGHT_FOUND');
  }

  /** The weight which corresponds to the unit parameter */
  const weight = abbrev.weights.find((wght) => parseFloat(wght.seq) === parseFloat(this.unit));

  if (!weight) {
    throw new Error('NO_WEIGHT_FOUND');
  }

  /** A combination of the record and its properties */
  const record = {
    ...abbrev.dataValues,
    ...this.toJSON(),
    id: this.id,
    quantity: parseFloat(this.quantity),
    date: this.date,
    unit: weight.description,
    seq: this.unit,
    gr: weightInGrams(weight, this.quantity),
  };

  /** Get the calories, protein, carbohydrates, and fat contributed by the record */
  ['calories', 'protein', 'carbohydrates', 'fat'].forEach((param) => {
    record[param] = Math.round(this.abbrev[param] * (record.gr / 100) * 10) / 10;
  });

  return record;
}

export default calMacros;
