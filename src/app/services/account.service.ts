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
  public accountSubject=new Subject<Employee>();

  constructor(private http: HttpClient) {
  }

  public changeAccountInfo(employee: Employee){
    this.accountSubject.next(employee);
    localStorage.setItem('accountInfo',JSON.stringify(employee));
  }

  public changAccountInfo(attribute?: {gender?: Gender,
    birthday?: Date,
    phoneNumber?: string,
    avatar?: string,
    address?: string,
    country?: string,
    province?: Province,
    district?: District,
    ward?: Ward}
    ){
    var employee = JSON.parse(localStorage.getItem('accountInfo') as string) as Employee;
    employee.gender = attribute?.gender || employee.gender;
    employee.birthday = attribute?.birthday || employee.birthday;
    employee.phoneNumber = attribute?.phoneNumber || employee.phoneNumber;
    employee.avatar = attribute?.avatar ||  employee.avatar;
    employee.country = attribute?.country ||  employee.country;
    employee.province = attribute?.province || employee.province;
    employee.district = attribute?.district || employee.district;
    employee.ward = attribute?.ward || employee.ward;

    this.accountSubject.next(employee);
    localStorage.setItem('accountInfo',JSON.stringify(employee));
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
