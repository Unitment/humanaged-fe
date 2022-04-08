import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Employee} from "../../model/employee/Employee";

const JWT_KEY = "auth-jwt";
const USER_KEY = "auth-user";
const REFRESH_TOKEN_KEY = "auth-refresh-token";

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  public loggedUser = new Subject<Employee>();

  constructor() {
    this.loggedUser.subscribe(data => this.updateUser(data))
  }

  saveToken(token: string) {
    window.sessionStorage.removeItem(JWT_KEY);
    window.sessionStorage.setItem(JWT_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({...user, accessToken: token});
    }
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(JWT_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public observeUser(employee: Employee) {
    this.loggedUser.next(employee);
  }

  private updateUser(employee: Employee) {
    const user = this.getUser();
    if (user) {
      user.name = employee.name;
      user.avatar = employee.avatar;
      user.personalMail = employee.personalMail;
      user.gender = employee.gender;
    }
    this.saveUser(user);
  }
}
