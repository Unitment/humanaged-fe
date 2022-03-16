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
}
