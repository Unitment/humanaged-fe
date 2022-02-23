import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailProjectComponent } from 'src/app/components/project-management/detail-project/detail-project.component';
import { Employee } from 'src/app/model/employee/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';


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
    @Inject(MAT_DIALOG_DATA) public data: {empId: string}) {
      this.employeeService.getDetailEmployee(data.empId).subscribe(e => this.employee = e);
    }

  ngOnInit(): void {
  }
  
  projectDetailClick(prjId: string){
    this.dialogRef.close();

    new DetailProjectComponent(this.matDialog).openProjectDetailDialog(prjId);
  }
}
