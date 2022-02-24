import {ProjectMember} from "../projectMember/ProjectMember";
<<<<<<< HEAD
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
  name: string,
  role: ProjectRole
=======
import {ProjectState} from "./ProjectState";

export interface Project {
  id: string,
  name: string,
  birthday: string,
  startDate: string,
  endDate: string,
  description: string,
  state: ProjectState,
  projectMember: ProjectMember[],
>>>>>>> origin/dev-HoangPT12
}
