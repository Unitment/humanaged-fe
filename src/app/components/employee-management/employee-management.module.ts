import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from '../../routing/employee-management-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';


@NgModule({
  declarations: [
    DetailEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    MatDialogModule
  ],
  exports: [DetailEmployeeComponent]
})
export class EmployeeManagementModule { }
