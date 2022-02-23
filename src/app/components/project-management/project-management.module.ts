import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from '../../routing/project-management-routing.module';

import { DetailProjectComponent } from './detail-project/detail-project.component';
import { DetailProjectDialogComponent } from './detail-project/detail-project-dialog/detail-project-dialog.component';


@NgModule({
  declarations: [DetailProjectComponent, DetailProjectDialogComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule
  ],
  exports: [DetailProjectComponent]
})
export class ProjectManagementModule { }
