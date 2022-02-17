import { ProjectMember } from "../projectMember/projectMember";
import { ProjectState } from "./projectState";

export interface Project{
    id: string,
    name: string,
    birthday: string,
    startDate: string,
    endDate: string,
    description: string,
    state: ProjectState,
    members: ProjectMember,
}