import { Province } from "./Province";
import { Ward } from "./Ward";

export interface District {
    id: number,
    name: string,
    prefix: string,
    province: Province,
    wards: Ward[],
}