import {ProjectMember} from "../projectMember/ProjectMember";
import { ProjectRole } from "../projectMember/ProjectRole";
import {ProjectState} from "./ProjectState";

export interface Project {
  id?: String;
  name?: String;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  state?: ProjectState;
  projectMembers?: ProjectMember[];
  employeeInProjectList?: EmployeeInProject[];
}

export interface EmployeeInProject {
  id: string,
  name?: string,
  role?: ProjectRole
}
