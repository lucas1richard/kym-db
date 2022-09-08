const sanitize = async (userInstance) => {
  let user;
  if (typeof userInstance.get === 'function') user = { ...userInstance.get() };
  else user = { ...userInstance };

  delete user.password;
  delete user.salt;
  delete user.id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.fitbitId;
  delete user.fitbitToken;
  delete user.fitbitRefreshToken;
  delete user.googleId;

  return user;
};

export default sanitize;
