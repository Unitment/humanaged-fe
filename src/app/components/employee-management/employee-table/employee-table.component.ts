import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmpFilter } from 'src/app/model/employee/EmpFilter';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

  employee:employee
  dataSource: employee[] = [
  ];



  displayedColumns: string[] = ['id', 'name', 'birthday','gender','phoneNo','mail','country','province','district','ward','address','status','accountName','action'];

  isLoaded=false;

  constructor(
    private router: Router,
    private _service : EmployeeService,
    private cdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.employeeTable();
    this.dataSource.filterPredicate = function (record,filter) {
      return record.account?.accountName.toLocaleLowerCase() == filter.toLocaleLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  employeeTable() {
    this._service.employeeTable().subscribe(
      data=>{
        this.empData.push(...data);
        this.isLoaded=true;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  dataSource = new MatTableDataSource(this.empData);
  dataSourceFilters = new MatTableDataSource(this.empData);

  onEditClick(id: string) {
    this.router.navigate(['/employee/edit', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  onDeleteClick(row:employee){}
}
