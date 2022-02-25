import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeManagementRoutingModule} from '../../routing/employee-management-routing.module';
import {MatDialogModule} from '@angular/material/dialog';

import {DetailEmployeeDialogComponent} from './detail-employee/detail-employee-dialog/detail-employee-dialog.component';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';
import {
  ImportFromFileDialogComponent
} from './create-employee/import-from-file-dialog/import-from-file-dialog.component';
import {ImportErrorDialogComponent} from './create-employee/import-error-dialog/import-error-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailEmployeeDialogComponent,
    DetailEmployeeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ImportFromFileDialogComponent,
    ImportErrorDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [DetailEmployeeComponent]
})
export class EmployeeManagementModule {
}
