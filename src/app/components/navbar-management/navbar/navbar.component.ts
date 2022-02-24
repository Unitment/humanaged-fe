import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account/Account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  account: Account;

  constructor(private router: Router,
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
