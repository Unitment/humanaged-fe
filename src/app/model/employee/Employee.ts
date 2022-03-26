import {Account} from "../account/Account";
import {Gender} from "./Gender";
import {Status} from "./Status";
import {ProjectMember} from "../projectMember/ProjectMember";
import {BusinessUnit} from "../businessUnit/BusinessUnit";
import { Province } from "../address/Province";
import { District } from "../address/District";
import { Ward } from "../address/Ward";

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
  province: Province,
  district: District,
  ward: Ward,
  account: Account,
  businessUnit: BusinessUnit,
  status: Status,
  modifiedDate:string;
  delete: boolean,
  projectMembers: ProjectMember[]
}
