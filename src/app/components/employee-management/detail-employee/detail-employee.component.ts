import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailEmployeeDialogComponent } from './detail-employee-dialog/detail-employee-dialog.component';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEmployeeDetailDialog(empId: string){
    this.dialog.open(DetailEmployeeDialogComponent, {
      height: "668px",
      width:"1125px",
      minHeight: "668px",
      minWidth: "1125px",
      data: {empId: empId}
    });
  }

}
