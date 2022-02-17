import { Employee } from "../employee/employee";
import { SystemRole } from "./systemRole";

export interface Account{
    accountName: string,
    password: string,
    role: SystemRole,
    employee: Employee
}