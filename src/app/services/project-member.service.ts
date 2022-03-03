import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ProjectAndMember} from '../model/projectMember/ProjectAndMember';
import {ProjectMember} from '../model/projectMember/ProjectMember';

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService {
  private apiServerUrl = environment.apiBaseUrl;
  private readonly API_PROJECT_MEMBER = environment.apiBaseUrl + "/projectMember";

  constructor(private http: HttpClient) {
  }

  public getPMs(): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.apiServerUrl}/projectMember/role/PM`);
  }

  public getProjectByIdPM(id: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.apiServerUrl}/projectMember/pm/${id}`);
  }

  public getMemberByProjectId(id: string): Observable<ProjectMember[]> {
    const temp = this.http.get<ProjectMember[]>(`${this.apiServerUrl}/projectMember/projectId/${id}`);
    // if(temp)
    return temp;
  }

  public getProjectAndMember(id: string): Observable<ProjectAndMember[]> {
    return this.http.get<ProjectAndMember[]>(`${this.apiServerUrl}/projectMember/projectAndMember/${id}`);
  }

  isProjectHasLeader(projectID: string): Observable<boolean> {
    return this.http.get<boolean>(this.API_PROJECT_MEMBER + "/check-leader/" + projectID);
  }
}
