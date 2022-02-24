import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { ChildViewComponent } from '../components/bu-management/child-view/child-view.component';
import { ParentViewComponent } from '../components/bu-management/parent-view/parent-view.component';

const routes: Routes = [
  {path:'', redirectTo: '/home',pathMatch:'full'},
  {path:'home', component: ParentViewComponent},
  // {path:'listProject', component: ChildViewComponent},
  {path:'listProject/:id', component: ChildViewComponent}
];
=======

const routes: Routes = [];
>>>>>>> origin/dev-HoangPT12

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuManagementRoutingModule { }
<<<<<<< HEAD

// export const routingBuComponents = [ParentViewComponent, ChildViewComponent]
=======
>>>>>>> origin/dev-HoangPT12
