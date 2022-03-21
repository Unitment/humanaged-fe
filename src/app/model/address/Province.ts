import { District } from "./District";
import { Ward } from "./Ward";

export interface Province {
    id: number;
    name: string;
    districts: District[];
    wards: Ward[];
}