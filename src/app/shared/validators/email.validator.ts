import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validateEmail: ValidatorFn = (
  control: AbstractControl
): { [key: string]: any } | null => {
  // tslint:disable-next-line: max-line-length
  const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!control.value) {
    return null;
  }
  const valid = EMAIL_REGEXP.test(control.value);

  return valid
    ? null
    : {
        email: true
      };
};
