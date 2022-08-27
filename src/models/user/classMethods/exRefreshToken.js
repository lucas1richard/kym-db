import axios from 'axios';

/**
 * Use the refresh token to get a new access token
 * @param {string} refTok refresh token
 * @param {number} uuid identifies the user
 * @return {Promise}
 * @this user
 * @async
 */
/* istanbul ignore next */
async function exRefreshToken({ refTok, uuid, refreshBuffer }) {
  const { data } = await axios.post(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refTok}`, null, {
    headers: {
      Authorization: `Basic ${refreshBuffer}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const { access_token: accessToken, refresh_token: refreshToken } = data;
  const user = await this.findByPk(uuid);
  user.fitbitToken = accessToken;
  user.fitbitRefreshToken = refreshToken;
  await user.save();
  const calories = await this.requestCalories(uuid);
  return calories;
}

export default exRefreshToken;
