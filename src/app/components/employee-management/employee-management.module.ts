import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeManagementRoutingModule} from '../../routing/employee-management-routing.module';
import {MatDialogModule} from '@angular/material/dialog';

import {DetailEmployeeDialogComponent} from './detail-employee-dialog/detail-employee-dialog.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';
import {
  ImportFromFileDialogComponent
} from './create-employee/import-from-file-dialog/import-from-file-dialog.component';
import {ImportErrorDialogComponent} from './create-employee/import-error-dialog/import-error-dialog.component';
import {EmployeeTableComponent} from './employee-table/employee-table.component'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailEmployeeDialogComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ImportFromFileDialogComponent,
    ImportErrorDialogComponent,
    EmployeeTableComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeManagementModule {
}
