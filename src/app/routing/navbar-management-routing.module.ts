import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserInfoComponent} from '../components/account-management/user-info/user-info.component';
import {ParentViewComponent} from '../components/bu-management/parent-view/parent-view.component';

const routes: Routes = [
  {path: '', component: ParentViewComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'info', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarManagementRoutingModule {
}
