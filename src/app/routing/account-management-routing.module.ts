import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EditUserInfoComponent } from '../components/account-management/edit-user-info/edit-user-info.component';

const routes: Routes = [
  {path: 'edit', component: EditUserInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule {
}
