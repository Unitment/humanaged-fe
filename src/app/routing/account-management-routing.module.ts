import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EditUserInfoComponent } from '../components/account-management/edit-user-info/edit-user-info.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  {
    path: "account", children: [
      {
        path: "edit", component: EditUserInfoComponent, canActivate: [UserGuard]
      },

  ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule {
}
