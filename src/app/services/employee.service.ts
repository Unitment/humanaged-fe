import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Employee} from '../model/employee/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_EMPLOYEE = environment.apiBaseUrl + "/employee";

  constructor(private http: HttpClient) {
  }

  public getAllEmployee(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.API_EMPLOYEE);
  }

  public getAllEmployeeByAccountName(accountName: string): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.API_EMPLOYEE + "/account", {params: new HttpParams().set('account', accountName)});
  }

  public getDetailEmployee(empId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_EMPLOYEE}/detail/${empId}`);
  }

  public getSupports(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_EMPLOYEE}/status/SUPPORT`);
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API_EMPLOYEE, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.API_EMPLOYEE, employee);
  }

  public getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.API_EMPLOYEE + "/" + id);
  }

  public checkFile(list: any): Observable<Map<string, string>> {
    return this.http.post<Map<string, string>>(this.API_EMPLOYEE + "/check-file", list);
  }

  public importFromFile(list: any) {
    return this.http.post(this.API_EMPLOYEE + "/import", list);
  }
}
