import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AccountManagementRoutingModule} from '../../routing/account-management-routing.module';
import {EditUserInfoComponent} from "./edit-user-info/edit-user-info.component"
import {LoginComponent} from "./login/login.component";
import {UserInfoComponent} from './user-info/user-info.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    LoginComponent,
    UserInfoComponent,
    EditUserInfoComponent
  ],
  imports: [
    CommonModule,
    AccountManagementRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AccountManagementModule {
}
