import {Gender} from "./Gender";
import {Status} from "./Status";
import {ProjectMember} from "../projectMember/ProjectMember";

export interface EmployeeDetail {
  id: string,
  name: string,
  gender: Gender,
  birthday: Date,
  phoneNumber: string,
  mail: string,
  avatar: string,
  address: string,
  country: string,
  provinceName: string,
  districtName: string,
  wardName: string,
  status: Status,
  isDelete: boolean,
  projectMembers: ProjectMember[]
}
