import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from '../../routing/project-management-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { DetailProjectComponent } from './detail-project/detail-project.component';
import { DetailProjectDialogComponent } from './detail-project/detail-project-dialog/detail-project-dialog.component';
import { EditProjectFormComponent } from './edit-project-form/edit-project-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [DetailProjectComponent, DetailProjectDialogComponent, EditProjectFormComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [DetailProjectComponent]
})
export class ProjectManagementModule {}
