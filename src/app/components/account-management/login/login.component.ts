import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/_services/auth.service";
import {AuthStorageService} from "../../../auth/_services/auth-storage.service";
import {EmployeeService} from "../../../services/employee.service";

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
              private tokenStorageService: AuthStorageService,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken)
        this.tokenStorageService.saveRefreshToken(data.refreshToken)
        this.tokenStorageService.saveUser(data.user)
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
}
