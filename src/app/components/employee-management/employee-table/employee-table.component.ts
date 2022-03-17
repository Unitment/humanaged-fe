import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from "../../../model/employee/Employee";

import { MatTableDataSource } from '@angular/material/table';
import { EmpFilter } from 'src/app/model/employee/EmpFilter';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  empData: Employee[] = [];

  empFilters: EmpFilter[]=[];

  dataSource = new MatTableDataSource(this.empData);
  dataSourceFilters = new MatTableDataSource(this.empData);

  // displayedColumns: string[] = ['id', 'name', 'birthday','gender','phoneNo','mail','country','province','district','ward','address','status','accountName','action'];
  displayedColumns: string[] = ['id', 'name', 'birthday','gender','phoneNo','mail','country','province','status','accountName','action'];

  isLoaded=false;

  constructor(
    private router: Router,
    private _service : EmployeeService,
    private dialogService: DialogService,
    private cdr:ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employeeTable();
    this.dataSource.filterPredicate = function (record,filter) {
      return record.account?.accountName.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    }
  }


  employeeTable() {
    this._service.employeeTable().subscribe(
      data => {
        let fdata = data.filter(d => {         
          return d.delete == false
        });
        this.empData.push(...fdata);
        this.isLoaded=true;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  onEditClick(id: string) {
    this.router.navigate(['/employee/update', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteClick(id: String){
    this.dialogService.openConfirmDialog( {
      data: {
        title: `Remove Employee ${id}`,
        content: `Do you want to remove Employee ${id}`,
        id: id
      }
    } as MatDialogConfig).afterClosed().subscribe(result => {
      if(result) //if accept button clicked
      {
        this._service.removeEmployee(id).subscribe(
        (response) => {
          console.log('delete ' + response);
          
          let index = this.dataSource.data.findIndex(e => e.id == id);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Error');
          console.log(error);
        });
      }
    });
  }
}
