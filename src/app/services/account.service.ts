import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Account} from '../model/account/Account';
import {environment} from 'src/environments/environment';
import { Employee } from '../model/employee/Employee';
import { Ward } from '../model/address/Ward';
import { District } from '../model/address/District';
import { Province } from '../model/address/Province';
import { Gender } from '../model/employee/Gender';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;
  public currentAccountEmployee=new Subject<Employee>();

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
    return this.http.put<Account>(`${this.apiServerUrl}/account/change-password`,account);
  }
  // public resetPassword(account:Account):
}
