import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly API_PROVINCE = "https://provinces.open-api.vn/api/";
  private readonly API_DISTRICT = "https://provinces.open-api.vn/api/p/";
  private readonly API_WARD = "https://provinces.open-api.vn/api/d/";

  constructor(private http: HttpClient) {
  }

  public getAllProvince(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.API_PROVINCE);
  }

  public getDistrictByProvince(code: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.API_DISTRICT + code + "?depth=2");
  }

  public getWardByDistrict(code: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.API_WARD + code + "?depth=2");
  }

}
