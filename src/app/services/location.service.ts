import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly API_PROVINCE = environment.apiBaseUrl + '/employee/provinces';
  private readonly API_DISTRICT = environment.apiBaseUrl + '/employee/districts';

  constructor(private http: HttpClient) {
  }

  public getAllProvince(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.API_PROVINCE);
  }

  public getDistrictByProvince(code: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.API_PROVINCE + "/" + code + "/districts");
  }

  public getWardByDistrict(code: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.API_DISTRICT + "/" + code + "/wards");
  }

}
