import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/model/account/Account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    account: Account = {
    accountName: '',
    password: ''
  };

  constructor(private loginService : AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAccount() {
    this.loginService.loginAccountFromRemote(this.account).subscribe(
      data => {
        console.log(data);
        console.log("Response Received")
        localStorage.setItem('account',JSON.stringify(data))
        this.router.navigate([''])
      },
      error => {
        console.log("Error Occured")
        alert("Wrong Username Or Password, Please try again!!")
      }
    );
  }
}
