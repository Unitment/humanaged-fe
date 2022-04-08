import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Account} from '../model/account/Account';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public loginAccountFromRemote(account: Account): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/account/login`, account);
  }

  public accountInfo(account: Account): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/account/info`, account);
  }

  public createTokenReset(accountName: String): Observable<String> {
    return this.http.put<any>(`${this.apiServerUrl}/account/reset/${accountName}`, null);
  }

  public getAccountByTokenReset(token: String): Observable<Account> {
    return this.http.get<any>(`${this.apiServerUrl}/account/token/${token}`);
  }

  public updatePassword(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiServerUrl}/account/change-password`, account);
  }

  // public resetPassword(account:Account):
}
