import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateEmployeeComponent} from "../components/employee-management/create-employee/create-employee.component";
import {UpdateEmployeeComponent} from "../components/employee-management/update-employee/update-employee.component";
import {EmployeeTableComponent} from "../components/employee-management/employee-table/employee-table.component";

const routes: Routes = [
  {
    path: "employee", children: [
      {
        path: "create", component: CreateEmployeeComponent
      },
      {
        path: "update/:id", component: UpdateEmployeeComponent
      },
      {
        path: "table", component: EmployeeTableComponent
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
