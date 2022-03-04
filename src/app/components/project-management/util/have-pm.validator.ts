import { ProjectRole } from './../../../model/projectMember/ProjectRole';
import { AbstractControl } from '@angular/forms';

export const ValidateHavePMInProject = (
  control: AbstractControl
): { [key: string]: any } | null => {
  if (control.value.some(
    (employee: { employeeName: string; employeeRole: string }) =>
      employee.employeeRole === ProjectRole.PM
  )) {
    return null;
  }
  return {
    havePMInProject: true
  }
};
