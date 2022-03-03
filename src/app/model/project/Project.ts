import {ProjectMember} from "../projectMember/ProjectMember";
import { ProjectRole } from "../projectMember/ProjectRole";
import {ProjectState} from "./ProjectState";

export interface Project {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  state: ProjectState;
  projectMembers: ProjectMember[];
  employeeInProjectList: EmployeeInProject[];
}

export interface EmployeeInProject {
  id: string,
  accountName: string,
  role: ProjectRole
}
