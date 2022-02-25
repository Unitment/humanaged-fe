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

import {NavbarManagementRoutingModule} from 'src/app/routing/navbar-management-routing.module';
import {NavbarComponent} from './navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NavbarManagementRoutingModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class NavbarManagementModule {
}
