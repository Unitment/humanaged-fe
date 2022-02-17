import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuManagementModule } from './components/bu-management/bu-management.module';
import { EmployeeManagementModule } from './components/employee-management/employee-management.module';
import { ProjectManagementModule } from './components/project-management/project-management.module';
import { ProjectMemberManagementModule } from './components/project-member-management/project-member-management.module';

import { AppComponent } from './app.component';
import { BuManagementRoutingModule } from './routing/bu-management-routing.module';
import { EmployeeManagementRoutingModule } from './routing/employee-management-routing.module';
import { ProjectManagementRoutingModule } from './routing/project-management-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BuManagementModule,
    BuManagementRoutingModule,
    EmployeeManagementModule,
    EmployeeManagementRoutingModule,
    ProjectManagementModule,
    ProjectManagementRoutingModule,
    ProjectMemberManagementModule,
    ProjectManagementRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
