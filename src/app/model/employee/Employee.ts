import {Account} from "../account/Account";
import {Gender} from "./Gender";
import {Status} from "./Status";
import {ProjectMember} from "../projectMember/ProjectMember";

export interface Employee {
  id: string,
  name: string,
  gender: Gender,
  birthday: Date,
  phoneNumber: string,
  mail: string,
  address: string,
  country: string,
  province: string,
  district: string,
  ward: string
  account: Account,
  status: Status,
  projectMembers: ProjectMember[]
}
