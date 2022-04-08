import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {AuthService} from "../../../auth/_services/auth.service";
import {EventBusService} from "../../../auth/_event/event-bus.service";
import {Subscription} from "rxjs";
import {EmployeeService} from 'src/app/services/employee.service';
import {AuthStorageService} from "../../../auth/_services/auth-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: string;
  username: string;
  mail: string
  avatar: string = "";
  gender: string;
  eventBusSub: Subscription;
  user: any;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private eventBusService: EventBusService,
    private authStorageService: AuthStorageService
  ) {
    this.authStorageService.loggedUser.subscribe(data => {
      this.user.name = data.name;
      this.user.avatar = data.avatar;
      this.user.personalMail = data.personalMail;
      this.user.gender = data.gender;
    })
  }

  ngOnInit(): void {
    this.user = this.authStorageService.getUser();
    this.eventBusSub = this.eventBusService.on('logout', () => this.logOut())
  }


  logOut() {
    this.authService.signOut(this.user.username);
    this.router.navigateByUrl("/login").then(() => window.location.reload());
    this.authStorageService.loggedUser.unsubscribe();
  }

}
