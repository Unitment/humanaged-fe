import { Employee } from "../employee/employee";
import { Project } from "../project/project";
import { ProjectMemberKey } from "./projectMemberKey";
import { ProjectRole } from "./projectRole";

export interface ProjectMember{
    projectMemberKey: ProjectMemberKey,
    employee: Employee,
    project: Project,
    role: ProjectRole,
}