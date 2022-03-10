import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from 'src/app/model/employee/Employee';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-detail-employee-dialog',
  templateUrl: './detail-employee-dialog.component.html',
  styleUrls: ['./detail-employee-dialog.component.css']
})
export class DetailEmployeeDialogComponent implements OnInit {
  employee!: Employee;

  constructor(
    private router: Router,
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


  onEditClick(id: string) {
    this.onClose().subscribe(() => {
          this.router.navigate(['/employee/update', id]);
    });
  }

  projectDetailClick(prjId: string) {
    this.onClose();
    this.dialogService.openProjectDetailDialog(prjId);
  }

  onClose(): Observable<any>{
    this.dialogRef.close();
    return this.dialogRef.afterClosed();
  }
}
