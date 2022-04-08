import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from 'src/app/model/account/Account';
import {AccountService} from 'src/app/services/account.service';
import {EmployeeService} from 'src/app/services/employee.service';
import {AuthStorageService} from "../../../auth/_services/auth-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isPasswordFocus = false;
  isRePasswordFocus = false;
  isNotSamePassword = false;
  token: string | null = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tokenStorageService: AuthStorageService,
              private employeeService: EmployeeService,
              private accountService: AccountService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const array = this.route.snapshot.url.toString().split(",");
    this.token = array[1];
  }

  public checkToken() {
  }

  resetPassword(password: string, rePassword: string) {
    if (password.match(rePassword)) {
      this.accountService.getAccountByTokenReset(this.token + "")
        .subscribe((response: Account) => {
            response.password = password
            this.accountService.updatePassword(response).subscribe();
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open(error.message, 'Close');
          }
        );
      this.router.navigateByUrl("/login")

    } else {
      this.isNotSamePassword = true;
    }
  }
}
