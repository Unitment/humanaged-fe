import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/account/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private http : HttpClient) { }


  public loginAccountFromRemote(account :Account): Observable<any>  {
    return this.http.post<any>("http://localhost:8080/api/account/login",account);
   ;
  }

  public accountInfo(account :Account): Observable<any>  {
    return this.http.post<any>("http://localhost:8080/api/account/info",account);
   ;
  }
}
