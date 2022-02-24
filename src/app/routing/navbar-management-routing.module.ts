import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/account-management/login/login.component';
import { UserInfoComponent } from '../components/account-management/user-info/user-info.component';
import { ParentViewComponent } from '../components/bu-management/parent-view/parent-view.component';

const routes: Routes = [
  {path:'' ,component:ParentViewComponent},
  {path:'user-info', component:UserInfoComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarManagementRoutingModule { }
