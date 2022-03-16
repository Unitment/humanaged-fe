import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {LoginResponse} from "../payload/LoginResponse";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_LOGIN = environment.apiBaseUrl + "/login";
  private API_LOGOUT = environment.apiBaseUrl + "/logout";
  private API_REFRESH_TOKEN = environment.apiBaseUrl + "/refreshtoken";

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.API_LOGIN, {
      username,
      password
    }, httpOptions);
  }

  signOut(accountName: string) {
    window.sessionStorage.clear();
    if (accountName != '') {
      return this.httpClient.post(this.API_LOGOUT, {
        accountName
      })
    }
    window.location.reload()
    return null;
  }

  refreshToken(token: string) {
    return this.httpClient.post(this.API_REFRESH_TOKEN, {
      refreshToken: token
    }, httpOptions)
  }

  isLogged() {
    return this.tokenStorageService.getToken() != null;
  }

  isAdmin() {
    return this.tokenStorageService.getUser().authorities[0].authority == "ROLE_ADMIN";
  }
}
