import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Employee} from 'src/app/model/employee/Employee';
import { DialogService } from 'src/app/services/dialog.service';
import {EmployeeService} from 'src/app/services/employee.service';


@Component({
  selector: 'app-detail-employee-dialog',
  templateUrl: './detail-employee-dialog.component.html',
  styleUrls: ['./detail-employee-dialog.component.css']
})
export class DetailEmployeeDialogComponent implements OnInit {
  employee!: Employee;

  constructor(
    private matDialog: MatDialog,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<DetailEmployeeDialogComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: { empId: string }) 
  {
    this.employeeService.getDetailEmployee(data.empId).subscribe(e => {
      this.employee = e
    });
  }

  ngOnInit(): void {
  }

  projectDetailClick(prjId: string) {
    this.onClose();

    this.dialogService.openProjectDetailDialog(prjId);
  }

  onClose(){
    this.dialogRef.close();
  }
}
