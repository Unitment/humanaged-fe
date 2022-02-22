import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getEmployeeById(id: string):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/api/employee/id/${id}`);
  }
  public getSupports():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/api/employee/PENDING`);
  }
}
