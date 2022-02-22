import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/model/businessUnit/BusinessUnit';
import { Employee } from 'src/app/model/employee/Employee';
import { Project } from 'src/app/model/project/Project';
import { ProjectAndMember } from 'src/app/model/projectMember/ProjectAndMember';
import { ProjectMember } from 'src/app/model/projectMember/ProjectMember';
import { ProjectMemberKey } from 'src/app/model/projectMember/ProjectMemberKey';
import { ProjectRole } from 'src/app/model/projectMember/ProjectRole';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectMemberService } from 'src/app/services/project-member.service';

@Component({
  selector: 'app-child-view',
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.css']
})
export class ChildViewComponent implements OnInit {

  // public businessUnits: BusinessUnit[] = [];
  // public pms: ProjectMember[]=[];
  // public projectMembers: ProjectMember[]=[];
  // public projectIds: ProjectMemberKey[] = [];
  // public employeeIds: ProjectMemberKey[] = [];

  public projectAndMembers: ProjectAndMember[] = [];

  public PM !: Employee;
  public namePM!:string;
  public PMid:string = '3';

  showFiller = false;

  constructor(private empService: EmployeeService, private pmService: ProjectMemberService) { }

  ngOnInit(): void {
    this.getPMById(this.PMid);
    this.getprojectAndMember(this.PMid);
    // this.getProjectByIdPM(this.PMid);
  }

  public getPMById(id: string):void{
    this.empService.getEmployeeById(id).subscribe(
      (response: Employee) => {
        this.PM = response;
        this.namePM = this.PM.account.accountName;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public getprojectAndMember(id: string):void{
    this.pmService.getProjectAndMember(id).subscribe(
      (response: ProjectAndMember[]) => {
        this.projectAndMembers = response;
        // alert(this.projectAndMembers.length)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public checkMemberRole(projectMember:ProjectMember):boolean{
    if(projectMember.role.toString() == 'LEADER'){
      return true;
    }else{
      return false;
    }
  }

  public checkProjectState(project:Project):string{
    let temp = ''
    switch(project.state.toString()){
      case 'PROCESSING': temp = '#BBFDB9';
      break;
      case 'CLOSED': temp = '#619360';
      break;
      case 'CLOSED': temp = 'white';
      break;
    }
    return temp;
  }

  public getAccountName(projectMember:ProjectMember):string{
    return projectMember.employee.account.accountName;
  }


  // public getProjectByIdPM(id: string):void{
  //   this.pmService.getProjectByIdPM(this.PMid).subscribe(
  //     (response: ProjectMember[]) => {
  //       this.pms = response;
  //       this.pms.forEach(element => {
  //         this.projectIds.push(element.projectMemberKey)
  //       });
  //     },
  //     (error:HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public getMemberByProjectId(id: string):boolean{
  //   this.pmService.getMemberByProjectId(id).subscribe(
  //     (response: ProjectMember[]) => {
  //       this.projectMembers = response;
  //       console.log(response);
        
  //       this.projectMembers.forEach(element => {
  //         this.employeeIds.push(element.projectMemberKey)
  //       });
  //     },
  //     (error:HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  //   if(this.employeeIds.length>0){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
}
