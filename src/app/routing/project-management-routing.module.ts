import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjectFormComponent } from '../components/project-management/edit-project-form/edit-project-form.component';
import { ProjectTableComponent } from '../components/project-management/project-table/project-table.component';

const routes: Routes = [
  { path: 'project/edit/:id', component: EditProjectFormComponent },
  { path: 'project/create', component: EditProjectFormComponent },
  { path: 'project/table', component: ProjectTableComponent }
  ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
