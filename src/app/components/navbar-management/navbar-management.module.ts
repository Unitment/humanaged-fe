import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarManagementRoutingModule } from 'src/app/routing/navbar-management-routing.module';
import { LoginComponent } from '../account-management/login/login.component';
import { UserInfoComponent } from '../account-management/user-info/user-info.component';


@NgModule({
  declarations: [
    CommonModule,
    LoginComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    NavbarManagementRoutingModule
  ]
})
export class NavbarManagementModule { }
