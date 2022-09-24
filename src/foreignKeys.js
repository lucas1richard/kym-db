import Joi from 'joi';

export const USER = 'user_uuid';
export const USER_VALIDATION = Joi.string().required().error(() => 'USER_UUID_REQUIRED');

export const FOOD_GROUP = 'FdGrp_Cd';

export const ABBREV = 'abbrev_id';
export const MEAL = 'meal_id';
