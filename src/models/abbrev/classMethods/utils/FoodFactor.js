/* eslint-disable class-methods-use-this */
class FoodFactor {
  constructor(foods) {
    this.foods = foods;
    this.status = 'constructing';
    const hasValidFoods = this.validateFoods();
    if (!hasValidFoods) {
      this.status = 'fail';
      return;
    }
    this.initialFactors = this.makeInitialFactors();

    this.pFood = this.makeFactor(this.initialFactors.protein);
    this.cFood = this.makeFactor(this.initialFactors.carbohydrates);
    this.fFood = this.makeFactor(this.initialFactors.fat);

    this.ensureMacro('pFood', 'protein');
    this.ensureMacro('cFood', 'carbohydrates');
    this.ensureMacro('fFood', 'fat');

    if (!this.pFood.p) this.getMaxMacroFactors('pFood', 'protein');
    if (!this.cFood.c) this.getMaxMacroFactors('cFood', 'carbohydrates');
    if (!this.fFood.f) this.getMaxMacroFactors('fFood', 'fat');

    this.status = 'success';
  }

  validateFoods() {
    const hasValidFoods = this.foods.reduce((memo, food) => memo && !!food, true);
    return hasValidFoods;
  }

  /**
   * Designate foods into separate arrays depending on their maxMacro
   * @returns {{ protein: Array, carbohydrates: Array, fat: Array}}
   */
  makeInitialFactors() {
    return this.foods.reduce((memo, food) => {
      memo[food.maxMacro].push(food);
      return memo;
    }, {
      protein: [],
      carbohydrates: [],
      fat: [],
    });
  }

  makeFactor(foodArr) {
    return foodArr.reduce((memo, food) => ({
      p: memo.p + Number.parseFloat(food.protein),
      c: memo.c + Number.parseFloat(food.carbohydrates),
      f: memo.c + Number.parseFloat(food.fat),
      weight: memo.weight + 100,
      foods: [...memo.foods, food],
    }), {
      p: 0,
      c: 0,
      f: 0,
      weight: 0,
      foods: [],
    });
  }

  ensureMacro(foodF, macro) {
    if (this[foodF].weight === 0) {
      this[foodF].foods = this.foods.reduce((memo, fd) => {
        if (fd[macro] * 1 > memo[macro]) {
          return fd;
        }
        return memo;
      }, { protein: 0, carbohydrates: 0, fat: 0 });
      this[foodF].foods = [this[foodF].foods];
      this[foodF].weight = 100;

      const food = this[foodF].foods[0];

      this[foodF].p = Number.parseFloat(food.protein);
      this[foodF].c = Number.parseFloat(food.carbohydrates);
      this[foodF].f = Number.parseFloat(food.fat);

      this.foods = this.foods.slice().filter((fd) => { // eslint-disable-line
        return fd.id !== food.id;
      });
    }

    if (foodF === 'pFood' || foodF === 'fFood') {
      this.initialFactors = this.makeInitialFactors();
    }

    if (foodF === 'pFood') {
      this.cFood = this.makeFactor(this.initialFactors.carbohydrates);
    }
    if (foodF === 'fFood') {
      this.pFood = this.makeFactor(this.initialFactors.protein);
      this.cFood = this.makeFactor(this.initialFactors.carbohydrates);
    }
  }

  getMaxMacroFactors(factor, macro) {
    this[factor].foods = this.foods.reduce((memo, fd) => {
      if (Number.parseFloat(fd[macro]) > memo[macro]) {
        return fd;
      }
      return memo;
    }, { protein: 0, carbohydrates: 0, fat: 0 });

    this[factor].foods = [this[factor].foods];
    this[factor].weight = 100;

    this[factor].p = Number.parseFloat(this[factor].foods[0].protein);
    this[factor].c = Number.parseFloat(this[factor].foods[0].carbohydrates);
    this[factor].f = Number.parseFloat(this[factor].foods[0].fat);
    return this;
  }

  checkFailure(goalDesc, factor, macro) {
    const {
      mainGoal,
      secondaryGoal,
      minimalGoal,
    } = goalDesc;

    const {
      primary,
      secondary,
      minimal,
    } = macro;

    const mainGoalRatio = mainGoal / (this[factor][primary] * (this[factor].weight / 100));

    const secondaryQuantity = this[factor][secondary] * mainGoalRatio;
    const minimalQuantity = this[factor][minimal] * mainGoalRatio;

    // If reaching the main goal causes the same food to exceed the secondary or
    // minimal goal, mark it as a failure.
    return (secondaryQuantity > secondaryGoal) || (minimalQuantity > minimalGoal);
  }

  /**
   * Calculate the weights of the foods in this factor to reach a specified
   * macronutrient goal target
   * @param {number} pGoal The protein goal
   * @param {number} cGoal The carbohydrate goal
   * @param {number} fGoal The fat goal
   * @return the weight of the foods in grams. `alpha` corresponds to the protein food, `beta` to the carb food, `gamma` to the fat food
   */
  calculateMealWeights(pGoal, cGoal, fGoal) {
    // Gram weights of the foods
    let pWeight = 30;
    let cWeight = 30;
    let fWeight = 30;

    const {
      pFood,
      cFood,
      fFood,
    } = this;

    // Gauss-Seidel Iteration
    for (let increment = 0; increment < 20; increment += 1) {
      pWeight = (pFood.weight / pFood.p)
        * (pGoal - ((cFood.p * cWeight) / cFood.weight) - ((fFood.p * fWeight) / fFood.weight));
      cWeight = (cFood.weight / cFood.c)
        * (cGoal - ((pFood.c * pWeight) / pFood.weight) - ((fFood.c * fWeight) / fFood.weight));
      fWeight = (fFood.weight / fFood.f)
        * (fGoal - ((pFood.f * pWeight) / pFood.weight) - ((cFood.f * cWeight) / cFood.weight));
    }

    return {
      /** corresponds to the protein food */
      alpha: pWeight,

      /** corresponds to the carb food */
      beta: cWeight,

      /** corresponds to the fat food */
      gamma: fWeight,
    };
  }
}

export default FoodFactor;
