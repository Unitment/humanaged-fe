import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
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
  }


  employeeTable() {
    this._service.employeeTable().subscribe(
      data=>{
        this.dataSource.push(...data);
        console.log(this.dataSource);
        this.isLoaded=true;
        this.cdr.markForCheck()
      }
    )
  }

  onEditClick(id: string) {
    this.router.navigate(['/employee/edit', id]);
  }



  onDeleteClick(row:employee){}
}
