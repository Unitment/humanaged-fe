import {ProjectMember} from "../projectMember/ProjectMember";
import {ProjectState} from "./ProjectState";

export interface Project {
  id: string,
  name: string,
  birthday: string,
  startDate: string,
  endDate: string,
  description: string,
  state: ProjectState,
  members: ProjectMember,
}
