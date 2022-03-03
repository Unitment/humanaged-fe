import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'

import {BuManagementModule} from './components/bu-management/bu-management.module';
import {EmployeeManagementModule} from './components/employee-management/employee-management.module';
import {ProjectManagementModule} from './components/project-management/project-management.module';
import {ProjectMemberManagementModule} from './components/project-member-management/project-member-management.module';
import {AccountManagementModule} from './components/account-management/account-management.module';

import {AppComponent} from './app.component';
import {NavbarManagementModule} from "./components/navbar-management/navbar-management.module";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BuManagementModule,
    EmployeeManagementModule,
    ProjectManagementModule,
    ProjectMemberManagementModule,
    AccountManagementModule,
    NavbarManagementModule,
    // RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
