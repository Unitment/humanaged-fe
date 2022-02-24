import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee/Employee';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  employee:Employee;
  private cdr: ChangeDetectorRef
  constructor() { }

  ngOnInit(): void {
    this.employee = JSON.parse( localStorage.getItem('employee') || '');
    this.cdr.markForCheck()
  }

}
