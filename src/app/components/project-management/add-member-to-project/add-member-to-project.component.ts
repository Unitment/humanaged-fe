import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../model/employee/Employee";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-member-to-project',
  templateUrl: './add-member-to-project.component.html',
  styleUrls: ['./add-member-to-project.component.css']
})
export class AddMemberToProjectComponent implements OnInit {

  employeeList: Array<Employee> = [];

  filteredEmployee: Array<Employee> = [];

  constructor(
    private employeeService: EmployeeService,
    private matDialogRef: MatDialogRef<AddMemberToProjectComponent>
  ) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe(
      data => {
        this.employeeList = data
      }
    )

  }

}
