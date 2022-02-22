import {Project} from "../project/Project";
import { ProjectMember } from "./ProjectMember";

export interface ProjectAndMember {
    project: Project;

    memberList: ProjectMember[];
}
