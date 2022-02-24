import {Account} from "../account/Account";
import {BusinessUnit} from "../businessUnit/BusinessUnit";
import { ProjectMember } from "../projectMember/ProjectMember";
import {Gender} from "./Gender";
import {Status} from "./Status";

export interface Employee {
  id: string,
  name: string,
  birthday: string,
  gender: Gender,
  mail: string,
  country: string,
  province: string,
  district: string,
  ward: string,
  status: Status,
  account: Account,
  businessUnit: BusinessUnit,
  projectMembers: ProjectMember[]
}
