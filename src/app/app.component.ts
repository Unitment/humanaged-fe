import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'humanaged';
  isLogged: boolean;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }
}
