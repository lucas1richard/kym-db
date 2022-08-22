function beforeUpdate() {
  throw new Error('Goals cannot be modified. Create new goals instead.');
}

export default beforeUpdate;
