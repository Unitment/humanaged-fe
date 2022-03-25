import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Account } from 'src/app/model/account/Account';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {AuthService} from "../../../auth/_services/auth.service";
import {TokenStorageService} from "../../../auth/_services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUsernameFocus = false;
  isPasswordFocus = false;
  isIncorrectUser = false;

  constructor(private router: Router,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private employeeService:EmployeeService) {
  }

  ngOnInit(): void {

  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken)
        this.tokenStorageService.saveRefreshToken(data.refreshToken)
        this.tokenStorageService.saveUser(data.user)
        this.accountInfo(data.user.id)
        this.router.navigateByUrl("/home").then(() => window.location.reload())
      },
      error => {
        if (error.status == 401) {
          this.isIncorrectUser = true;
        }
      },
      () => undefined
    )
  }

  accountInfo(id:string) {
    this.employeeService.getEmployeeById(id).subscribe (
      data => {
        localStorage.setItem('accountInfo',JSON.stringify(data));
        console.log(data);
      }
    )
  }
}
