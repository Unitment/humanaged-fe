import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DetailEmployeeDialogComponent } from './detail-employee-dialog/detail-employee-dialog.component';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  openEmployeeDetailDialog(empId: string){
    let dialog = this.dialog.open(DetailEmployeeDialogComponent, {
      height: "668px",
      width:"1125px",
      minHeight: "668px",
      minWidth: "1125px"
      });
    this.employeeService.getDetailEmployee(empId).subscribe(e => dialog.componentInstance.employee = e);
  }

}
