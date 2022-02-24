import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjectFormComponent } from '../components/project-management/edit-project-form/edit-project-form.component';

const routes: Routes = [
  { path: 'project/edit/:id', component: EditProjectFormComponent },
  { path: 'project/create', component: EditProjectFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
