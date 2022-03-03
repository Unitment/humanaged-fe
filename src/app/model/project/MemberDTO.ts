import {ProjectRole} from "../projectMember/ProjectRole";

export interface MemberDTO {
  projectID: string,
  employeeIDList: Array<string>,
  role: ProjectRole
}
