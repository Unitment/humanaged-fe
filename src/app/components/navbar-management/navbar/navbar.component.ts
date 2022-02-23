import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account/Account';
import { SystemRole } from 'src/app/model/account/SystemRole';
import { Employee } from 'src/app/model/employee/Employee';
import { AccountService } from 'src/app/services/account.service';
import { LoginComponent } from '../../account-management/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  account: Account = {
    accountName: '',
    password:'',
  };

  constructor(private router:Router,
    private accountService : AccountService
    ) { }

  ngOnInit(): void {

  }

  logOutAccount() {
    localStorage.removeItem('account')
    this.router.navigate([''])
}

accountInfo() {
  this.accountService.accountInfo(this.account).subscribe (
    data => {
      this.router.navigate(['/user-info'])
      localStorage.setItem('employee',JSON.stringify(data))
    },

  )
}

}
