export const validateAbilityData = (ability, value) => {
  const errors = [];
  if (ability.type === "number") {
    if (!/^-?(\d)*\.?(\d)*$/.test(value)) {
      errors.push("Not a valid number");
    } else {
      value = Number(value);
      if (ability.maxValue && value > ability.maxValue) {
        errors.push(`Maximum allowed value is ${ability.maxValue}`);
      }
      if (ability.minValue && value < ability.minValue) {
        errors.push(`Minimum allowed value is ${ability.minValue}`);
      }
      if (ability.multipleOf && value % ability.multipleOf !== 0) {
        errors.push(`Has to be multiple of ${ability.multipleOf}`);
      }
    }
  } else if (ability.type === "string") {
    if (
      ability.format === "date-time" &&
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/.test(value)
    ) {
      errors.push("Not valid ISO8601 date-time");
    }
  }
  console.log(errors);
  return errors.length ? errors.join(". ") : null;
};
