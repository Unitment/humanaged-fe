import { AbstractControl } from '@angular/forms';

export const ValidateEndDate = (
  control: AbstractControl
): { [key: string]: any } | null => {
  if (control.value === null) {
    return null;
  }
  const startDate = new Date(control.parent?.get('startDate')?.value);
  const endDate = new Date(control.value);
  if (startDate > endDate) {
    return { endDate: true };
  }
  return null;
};
