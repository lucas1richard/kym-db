import { USER, ABBREV } from '../../../foreignKeys';
import { foodRecordKeys } from '../config';

/**
 * Create a food record with associated meal
 * @example
 * FoodRecord.findOne({
 *     include: [{
 *       model: Abbrev,
 *       include: [
 *         Weight,
 *       ],
 *     }],
 *   })
 * @return {Promise}
 */
async function createWithMeal({
  instance, Meal, Abbrev, Weight,
}) {
  const {
    [ABBREV]: abbrevId,
    date,
    meal,
    quantity,
    unit,
    uuid,
    confirmed,
  } = instance;

  const createRecordConfig = {
    [ABBREV]: abbrevId,
    [USER]: uuid,
    [foodRecordKeys.DATE]: date,
    [foodRecordKeys.MEAL]: meal,
    [foodRecordKeys.QUANTITY]: quantity,
    [foodRecordKeys.UNIT]: unit,
    [foodRecordKeys.CONFIRMED]: confirmed,
  };

  const findConfig = {
    where: {
      [USER]: uuid,
      date,
      meal,
    },
  };

  const [food, [_meal]] = await Promise.all([
    this.create(createRecordConfig),
    Meal.findOrCreate(findConfig),
  ]);
  const [rawRecord] = await Promise.all([
    this.findByPk(food.id, {
      include: [
        Meal,
        {
          model: Abbrev,
          include: [
            Weight,
          ],
        },
      ],
    }),
    _meal.addFoodRecord(food),
  ]);

  _meal.public = false;

  await _meal.save();
  const record = await rawRecord.calMacros();

  return record;
}

export default createWithMeal;
