import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Project} from '../model/project/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiServerUrl = environment.apiBaseUrl;
  private readonly API_PROJECT = environment.apiBaseUrl + "/project";

  constructor(private http: HttpClient) {
  }

  public getDetailProject(prjId: string): Observable<Project> {
    return this.http.get<Project>(`${environment.apiBaseUrl}/project/${prjId}`);
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiServerUrl}/project`,
      project
    );
  }

  editProject(project: Project): Observable<Project> {
    return this.http.put<Project>(
      `${this.apiServerUrl}/project/`,
      project
    );
  }

  getProjectById(id: string | null): Observable<Project> {
    return this.http.get<Project>(
      `${this.apiServerUrl}/project/${id}`
    );
  }

  deleteProject(project: Project): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/project/${project.id}`);
  }
}
