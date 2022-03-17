import { District } from "./District";
import { Province } from "./Province";

export interface Ward {
    id: number,
    name: string,
    prefix: string,
    province: Province,
    district: District,
}