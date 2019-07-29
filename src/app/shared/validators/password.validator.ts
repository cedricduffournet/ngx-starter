import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validatePassword: ValidatorFn = (
  c: AbstractControl
): any | undefined => {
  const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*\d)[A-Za-z0-9\W]{8,}$/;
  if (!c.value) {
    return undefined;
  }

  return PASSWORD_REGEXP.test(c.value)
    ? undefined
    : {
        password: true
      };
};
