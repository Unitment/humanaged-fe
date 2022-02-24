import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccountManagementRoutingModule } from '../../routing/account-management-routing.module';

import { LoginComponent } from "./login/login.component";
import { UserInfoComponent } from './user-info/user-info.component';



@NgModule({
  declarations: [
    LoginComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    AccountManagementRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class AccountManagementModule { }
