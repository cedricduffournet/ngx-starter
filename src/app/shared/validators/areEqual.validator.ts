import { FormGroup } from '@angular/forms';

export const areEqual = (fg: FormGroup): any => {
  let i = 0;
  let valid = true;
  let value = '';

  for (const name in fg.controls) {
    if (fg.controls.hasOwnProperty(name)) {
      if (i === 0) {
        value = fg.controls[name].value;
      } else {
        if (value !== fg.controls[name].value) {
          valid = false;
        }
      }
      i++;
    }
  }

  return valid
    ? undefined
    : {
        notEqual: !valid
      };
};
