import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/dialog/confirm-dialog/confirm-dialog.component';
import { DetailEmployeeDialogComponent } from '../components/employee-management/detail-employee-dialog/detail-employee-dialog.component';
import { DetailProjectDialogComponent } from '../components/project-management/detail-project-dialog/detail-project-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openEmployeeDetailDialog(id: string): MatDialogRef<DetailEmployeeDialogComponent, any>{
    return this.dialog.open(DetailEmployeeDialogComponent, {
      height: "668px",
      width:"1125px",
      minHeight: "668px",
      minWidth: "1125px",
      autoFocus: false,
      restoreFocus: false,
      data: {empId: id}
    });
  }

  openProjectDetailDialog(id: string): MatDialogRef<DetailProjectDialogComponent, any>{
    return this.dialog.open(DetailProjectDialogComponent, {
      height: "668px",
      width:"1125px",
      minHeight: "668px",
      minWidth: "1125px",
      autoFocus: false,
      restoreFocus: false,
      data: {prjId: id}
    });
  }

  openConfirmDialog(data: any){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: data
    })
  }
}
