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
  createdDate: Date;
  projectMembers: ProjectMember[];
  isDelete: boolean;
  employeeInProjectList: EmployeeInProject[];
}

export interface EmployeeInProject {
  id: string,
  accountName: string,
  role: ProjectRole
}
