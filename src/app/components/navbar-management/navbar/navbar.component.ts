import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account/Account';
import { Employee } from 'src/app/model/employee/Employee';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  account: Account;
  employee:Employee;

  constructor(private router: Router,
    private accountService : AccountService
  ) { }

  ngOnInit(): void {
    this.employee = JSON.parse( localStorage.getItem('accountInfo') || '');
  }

  logOutAccount() {
    localStorage.removeItem('account')
    localStorage.removeItem('accountInfo')
    this.router.navigate([''])
}

}
