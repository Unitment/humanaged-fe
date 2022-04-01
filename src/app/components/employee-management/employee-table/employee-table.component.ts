import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/auth/_services/auth.service'
import { Employee } from "../../../model/employee/Employee";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  empData: Employee[] = [];
  empData1: Employee[] = [];


  dataSource = new MatTableDataSource(this.empData);
  dataSourceFilters = new MatTableDataSource(this.empData);
  displayedColumns: string[] = ['id', 'name', 'birthday','gender','phoneNo','mail','country','province','status','accountName'];

  // displayedColumns: string[] = ['id', 'name', 'birthday','gender','phoneNo','mail','country','province','district','ward','address','status','accountName','action'];

  isLoaded=false;
  isAdmin=false;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private _service : EmployeeService,
    private dialogService:DialogService,
    private authService:AuthService,
    private cdr:ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this._service.employeeTable().subscribe(
        data => {
          let sortedData = this.employeeSort(data);
          this.empData.push(...sortedData);
          console.log('man', [...this.empData]);
          this.isLoaded=true;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isAdmin=this.authService.isAdmin();
          if (this.authService.isAdmin()) {
           this.displayedColumns = ['id', 'name', 'birthday','gender','phoneNo','mail','country','province','status','accountName','action'];
          }
        }
      )
    )







    this.dataSourceFilters.filterPredicate = function (record,filter) {
      // return record.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
      // debugger;
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="All") || (record[key as keyof Employee] == value);
        if(!isMatch) return false;
      }
      return isMatch;
    }
}

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  employeeSort(empData:Employee[] ) {
    return empData.sort((a, b) => Date.parse(b.modifiedDate) - Date.parse(a.modifiedDate))
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
  detailEmployee(id: string) {
    this.dialogService.openEmployeeDetailDialog(id);
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


