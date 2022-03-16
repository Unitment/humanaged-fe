import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChildViewComponent} from '../components/bu-management/child-view/child-view.component';
import {ParentViewComponent} from '../components/bu-management/parent-view/parent-view.component';
import {UserGuard} from "../core/guards/user.guard";

const routes: Routes = [
  {
    path: '', canActivate: [UserGuard], children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: ParentViewComponent},
      {path: 'pm/:id/project', component: ChildViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuManagementRoutingModule {
}

// export const routingBuComponents = [ParentViewComponent, ChildViewComponent]
