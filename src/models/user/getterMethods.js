export default {
  fitbitSynced() {
    return !!this.fitbitId;
  },
  googleSynced() {
    return !!this.googleId;
  },
};
