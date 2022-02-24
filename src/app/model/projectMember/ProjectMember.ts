import {Employee} from "../employee/Employee";
import {Project} from "../project/Project";
import {ProjectMemberKey} from "./ProjectMemberKey";
import {ProjectRole} from "./ProjectRole";

export interface ProjectMember {
  projectMemberKey: ProjectMemberKey,
  employee?: Employee,
  project?: Project,
  role: ProjectRole,
}
