import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as XLSX from "xlsx";
import {ImportErrorDialogComponent} from "../import-error-dialog/import-error-dialog.component";
import {EmployeeService} from "../../../../services/employee.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-import-from-file-dialog',
  templateUrl: './import-from-file-dialog.component.html',
  styleUrls: ['./import-from-file-dialog.component.css']
})
export class ImportFromFileDialogComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<ImportFromFileDialogComponent>,
    private employeeService: EmployeeService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  data: any;

  addFile(event: Event) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer><unknown>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    };
  }

  addEmployee() {
    this.employeeService.checkFile(this.data).subscribe(
      (duplicateAccountList) => {
        console.log()
        console.log(Object.keys(duplicateAccountList).length == 0)
        if (Object.keys(duplicateAccountList).length != 0) {
          this.matDialog.open(ImportErrorDialogComponent, {
            data: duplicateAccountList,
            width: "600px"
          }).afterClosed().subscribe(result => {
              if (result) {
                this.employeeService.importFromFile(this.data).subscribe(
                  () => {
                    this.snackBar.open("Add Successful", "OK", {
                      duration: 3000,
                      panelClass: ['mat-toolbar', 'mat-primary']
                    });
                    this.matDialogRef.close()
                  }
                )
              }
            }
          )
        } else {
          this.employeeService.importFromFile(this.data).subscribe(
            () => {
              this.snackBar.open("Add Successful", "OK", {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary']
              });
              this.matDialogRef.close()
            }
          );
        }
      })
  }
}
