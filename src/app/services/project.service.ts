import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(
      'http://localhost:8080/api/project/'
    );
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(
      'http://localhost:8080/api/project',
      project
    );
  }

  editProject(project: Project): Observable<Project> {
    return this.http.put<Project>(
      `http://localhost:8080/api/project/`,
      project
    );
  }

  getProjectById(id: string | null): Observable<Project> {
    return this.http.get<Project>(
      `http://localhost:8080/api/project/${id}`
    );
  }

  deleteProject(project: Project): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/project/${project.id}`);
  }
}
