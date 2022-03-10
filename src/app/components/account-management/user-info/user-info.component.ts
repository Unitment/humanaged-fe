import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account/Account';
import { Employee } from 'src/app/model/employee/Employee';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  employee: Employee;
  private cdr: ChangeDetectorRef
  constructor(private loginService : AccountService) { }

  account: Account = {
    accountName: '',
    password: '',
  };

  ngOnInit(): void {
    this.employee = JSON.parse( localStorage.getItem('accountInfo') || '');
    this.cdr.markForCheck()
  }



}
