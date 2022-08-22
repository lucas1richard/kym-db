import { USER } from '../../../../src';
import requestCaloriesUnbound from '../../../../src/models/user/classMethods/requestCalories';

const requestCalories = requestCaloriesUnbound.bind(User);
