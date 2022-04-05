import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {AuthService} from "../../../auth/_services/auth.service";
import {TokenStorageService} from "../../../auth/_services/token-storage.service";
import {EventBusService} from "../../../auth/_event/event-bus.service";
import {Subscription} from "rxjs";
import { Employee } from 'src/app/model/employee/Employee';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: string;
  username: string;
  mail: string
  avatar: string | null;
  gender:string;
  eventBusSub: Subscription;
  employee:Employee;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private cdr:ChangeDetectorRef,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    const accountInfo = localStorage.getItem('accountInfo');
    this.employee = accountInfo ? JSON.parse(accountInfo) : null;
    this.accountService.accountSubject.subscribe(
      data => {
        this.employee=data;
      }
    )
    // this.username = this.tokenStorageService.getUser().username;
    // this.gender = this.tokenStorageService.getUser().gender;
    this.eventBusSub = this.eventBusService.on('logout', () => this.logOut())
  }


  logOut() {
    this.authService.signOut(this.employee.account.accountName);
    localStorage.removeItem('accountInfo')
    this.router.navigateByUrl("/login").then(() => window.location.reload());
  }

}
