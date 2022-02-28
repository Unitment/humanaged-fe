import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from '../../routing/project-management-routing.module';
import { EditProjectFormComponent } from './edit-project-form/edit-project-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ProjectTableComponent } from './project-table/project-table.component';

@NgModule({
  declarations: [EditProjectFormComponent, ConfirmDialogComponent, ProjectTableComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class ProjectManagementModule {}
