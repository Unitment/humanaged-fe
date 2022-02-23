import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusinessUnit } from '../model/businessUnit/BusinessUnit';

@Injectable({
  providedIn: 'root'
})
export class BuService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getBusinessUnits():Observable<BusinessUnit[]>{
    return this.http.get<BusinessUnit[]>(`${this.apiServerUrl}/api/bu/all`);
  }
}
