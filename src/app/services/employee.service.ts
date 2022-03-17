import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Employee} from '../model/employee/Employee';
import { EmployeeDetail } from '../model/employee/EmployeeDetail';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_EMPLOYEE = environment.apiBaseUrl + "/employee";
  public employeeSubject=new Subject<any>();

  constructor(private http: HttpClient) {
  }

  public getAllEmployee(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.API_EMPLOYEE);
  }

  public getAvailableEmployeeForProject(projectID: string): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.API_EMPLOYEE, {params: new HttpParams().set('projectID', projectID)});
  }

  public getAllEmployeeByAccountName(accountName: string): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.API_EMPLOYEE + "/account", {params: new HttpParams().set('account', accountName)});
  }

  public getDetailEmployee(empId: string): Observable<EmployeeDetail> {
    return this.http.get<EmployeeDetail>(`${this.API_EMPLOYEE}/detail/${empId}`);
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

  public employeeTable(): Observable<any> {
    return this.http.get<any>(this.API_EMPLOYEE);
  }

  public removeEmployee(id: String) : Observable<Employee> {
    return this.http.delete<Employee>(this.API_EMPLOYEE + "/" + id)
  }
}
