import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectManagementRoutingModule} from '../../routing/project-management-routing.module';

import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import { ProjectManagementRoutingModule } from '../../routing/project-management-routing.module';
import { EditProjectFormComponent } from './edit-project-form/edit-project-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ProjectTableComponent } from './project-table/project-table.component';

import {DetailProjectComponent} from './detail-project/detail-project.component';
import {DetailProjectDialogComponent} from './detail-project/detail-project-dialog/detail-project-dialog.component';
import {EditProjectFormComponent} from './edit-project-form/edit-project-form.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {AddMemberToProjectComponent} from "./add-member-to-project/add-member-to-project.component";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatSelectSearchModule} from "mat-select-search";

@NgModule({
  declarations: [DetailProjectComponent, DetailProjectDialogComponent, EditProjectFormComponent, ConfirmDialogComponent, AddMemberToProjectComponent,ProjectTableComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
    MatSelectSearchModule
  ],
  exports: [DetailProjectComponent]
})
export class ProjectManagementModule {}
