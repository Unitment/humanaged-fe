import { Account } from "../account/account";
import { BusinessUnit } from "../businessUnit/businessUnit";
import { Project } from "../project/project";
import { Gender } from "./gender";
import { Status } from "./status";

export interface Employee{
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
    projects: Project[]
}