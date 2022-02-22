import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { BuManagementRoutingModule } from '../../routing/bu-management-routing.module';
import { ParentViewComponent } from './parent-view/parent-view.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { ChildViewComponent } from './child-view/child-view.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ParentViewComponent,
    ChildViewComponent
  ],
  imports: [
    CommonModule,
    BuManagementRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  exports: [ParentViewComponent, ChildViewComponent]
})
export class BuManagementModule { }
