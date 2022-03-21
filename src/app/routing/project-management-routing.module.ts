import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProjectFormComponent} from '../components/project-management/edit-project-form/edit-project-form.component';
import {ProjectTableComponent} from '../components/project-management/project-table/project-table.component';
import {AdminGuard} from "../core/guards/admin.guard";
import {UserGuard} from "../core/guards/user.guard";

const routes: Routes = [
  {path: 'project/edit/:id', component: EditProjectFormComponent, canActivate: [AdminGuard]},
  {path: 'project/create', component: EditProjectFormComponent, canActivate: [AdminGuard]},
  {path: 'project', component: ProjectTableComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {
}
