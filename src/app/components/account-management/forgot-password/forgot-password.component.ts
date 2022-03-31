import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Account } from 'src/app/model/account/Account';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {AuthService} from "../../../auth/_services/auth.service";
import {TokenStorageService} from "../../../auth/_services/token-storage.service";
import {Employee} from "../../../model/employee/Employee";
import {isEmpty} from "rxjs/operators";
import {MatSnackBar, SimpleSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isUsernameFocus = false;
  isIncorrectUser = false;
  isSendMailSuccess = false;

  constructor(private router: Router,
              private accountService: AccountService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  sendMail(username: string):void {
    this.accountService.createTokenReset(username).subscribe(
      value => {
      },
    error => {
      if (error.status == 404) {
        this.isIncorrectUser = true;
      }
      },
    );
    if (!this.isIncorrectUser) this.snackBar.open("We sent a password reset link to your email, please check!", "Closed");
  }
}
