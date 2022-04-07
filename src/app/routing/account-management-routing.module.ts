import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserInfoComponent } from '../components/account-management/user-info/user-info.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  {
    path: "account", children: [
      {
        path: 'info', component: UserInfoComponent, canActivate:[UserGuard]
      }

  ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule {
}
