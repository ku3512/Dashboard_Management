import { ValidatorForm } from "react-material-ui-form-validator";

const PasswordValidation = (isPasswordMatch, valuee, password) => {
  ValidatorForm.addValidationRule(isPasswordMatch, (valuee) => {
    console.log(valuee);

    console.log(password);

    if (valuee !== password) {
      return false;
    }

    return true;
  });
};

const TextValidation = (isText, value) => {
  ValidatorForm.addValidationRule(isText, (value) => {
    console.log(value);

    if (!isNaN(value)) {
      return false;
    }

    return true;
  });
};

export { PasswordValidation, TextValidation };
