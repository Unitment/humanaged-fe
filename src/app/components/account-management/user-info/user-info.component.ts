import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account/Account';
import { Employee } from 'src/app/model/employee/Employee';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  employee: Employee;
  private cdr: ChangeDetectorRef;
  constructor(
    private router: Router,
    private employeeService : EmployeeService
  ) { }

  account: Account = {
    accountName: '',
    password: '',
  };

  ngOnInit(): void {
    const accountInfo = localStorage.getItem('accountInfo');
    this.employee = accountInfo ? JSON.parse(accountInfo) : null;
    console.log(this.employee);
  }

  onEditClick(id: string) {
    this.router.navigate(['/employee/update', id]);
  }
}
