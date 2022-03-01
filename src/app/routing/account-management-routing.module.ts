import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentViewComponent } from '../components/bu-management/parent-view/parent-view.component';

const routes: Routes = [
  // {path:'' ,component:ParentViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
