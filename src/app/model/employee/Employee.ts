import {Account} from "../account/Account";
import {Gender} from "./Gender";
import {Status} from "./Status";
import {ProjectMember} from "../projectMember/ProjectMember";
import {BusinessUnit} from "../businessUnit/BusinessUnit";

export interface Employee {
  id: string,
  name: string,
  gender: Gender,
  birthday: Date,
  phoneNumber: string,
  mail: string,
  avatar: string,
  address: string,
  country: string,
  province: string,
  district: string,
  ward: string
  account: Account,
  businessUnit: BusinessUnit,
  status: Status,
  isDelete: boolean,
  projectMembers: ProjectMember[]
}
