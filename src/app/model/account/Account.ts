import {Employee} from "../employee/Employee";
import {SystemRole} from "./SystemRole";

export interface Account {
  accountName: string,
  password: string,
  role?: SystemRole,
  employee?: Employee
}
