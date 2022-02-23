import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from '../../routing/employee-management-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

import { DetailEmployeeDialogComponent } from './detail-employee/detail-employee-dialog/detail-employee-dialog.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';


@NgModule({
  declarations: [
    DetailEmployeeDialogComponent,
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
