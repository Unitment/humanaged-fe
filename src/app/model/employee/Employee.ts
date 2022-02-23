import {Account} from "../account/Account";
import {BusinessUnit} from "../businessUnit/BusinessUnit";
<<<<<<< HEAD
=======
import {Project} from "../project/Project";
>>>>>>> origin/dev-TrangTTU
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
<<<<<<< HEAD
  ward: string,
  status: Status,
  account: Account,
  businessUnit: BusinessUnit,
  projectMember: ProjectMember[]
=======
    ward: string,
    status: Status,
    account: Account,
    businessUnit: BusinessUnit,
    projects: ProjectMember[]
>>>>>>> origin/dev-TrangTTU
}
