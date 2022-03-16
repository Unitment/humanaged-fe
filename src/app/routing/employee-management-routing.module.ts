import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateEmployeeComponent} from "../components/employee-management/create-employee/create-employee.component";
import {UpdateEmployeeComponent} from "../components/employee-management/update-employee/update-employee.component";
import {EmployeeTableComponent} from "../components/employee-management/employee-table/employee-table.component";
import {AdminGuard} from "../core/guards/admin.guard";
import {UserGuard} from "../core/guards/user.guard";

const routes: Routes = [
  {
    path: "employee", children: [
      {
        path: "create", component: CreateEmployeeComponent, canActivate: [AdminGuard]
      },
      {
        path: "update/:id", component: UpdateEmployeeComponent, canActivate: [AdminGuard]
      },
      {
        path: "table", component: EmployeeTableComponent, canActivate: [UserGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule {
}
