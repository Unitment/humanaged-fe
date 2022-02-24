import { Account } from '../account/Account';
import { BusinessUnit } from '../businessUnit/BusinessUnit';
import { Project } from '../project/Project';
import { Gender } from './Gender';
import { Status } from './Status';

export interface Employee {
  id: string;
  name: string;
  birthday: string;
  gender: Gender;
  mail: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  status: Status;
  account: Account;
  businessUnit: BusinessUnit;
  projects: Project[];
}
