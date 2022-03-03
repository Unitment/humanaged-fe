import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Employee} from 'src/app/model/employee/Employee';
import {Project} from 'src/app/model/project/Project';
import {ProjectAndMember} from 'src/app/model/projectMember/ProjectAndMember';
import {ProjectMember} from 'src/app/model/projectMember/ProjectMember';
import {EmployeeService} from 'src/app/services/employee.service';
import {ProjectMemberService} from 'src/app/services/project-member.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../project-management/confirm-dialog/confirm-dialog.component";
import {
  DetailEmployeeDialogComponent
} from "../../employee-management/detail-employee/detail-employee-dialog/detail-employee-dialog.component";
import {
  AddMemberToProjectComponent
} from "../../project-management/add-member-to-project/add-member-to-project.component";
import {
  DetailProjectDialogComponent
} from "../../project-management/detail-project/detail-project-dialog/detail-project-dialog.component";

@Component({
  selector: 'app-child-view',
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.css']
})
export class ChildViewComponent implements OnInit {

  public projectAndMembers: ProjectAndMember[] = [];
  public displayProject: ProjectAndMember[] = [];

  public PM: Employee;
  public namePM: string;
  public PMid: string;

  showFiller = false;
  searchText: any;
  selectedValue: string = 'new-to-old';
  checkProcessing: boolean = false;
  checkClosed: boolean = false;
  checkPending: boolean = false;
  ops = [
    {value: 'a-to-z', viewValue: 'A to Z'},
    {value: 'z-to-a', viewValue: 'Z to A'},
    {value: 'old-to-new', viewValue: 'Oldest to Newest'},
    {value: 'new-to-old', viewValue: 'Newest to Oldest'}
  ]

  constructor(
    private empService: EmployeeService,
    private pmService: ProjectMemberService,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.PMid = params.get('id') + '';
    })
    this.getPMById(this.PMid);
    this.getprojectAndMember(this.PMid);
    // this.getProjectByIdPM(this.PMid);
  }

  public getPMById(id: string): void {
    this.empService.getEmployeeById(id).subscribe(
      (response: Employee) => {
        this.PM = response;
        this.namePM = this.PM.account.accountName;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public getprojectAndMember(id: string): void {
    this.pmService.getProjectAndMember(id).subscribe(
      (response: ProjectAndMember[]) => {
        this.projectAndMembers = response;
        this.displayProject = this.projectAndMembers;
        this.changeClient(this.selectedValue);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public checkMemberRole(projectMember: ProjectMember): boolean {
    if (projectMember.role.toString() === 'LEADER') {
      return true;
    } else {
      return false;
    }
  }

  public checkProjectState(project: Project): string {
    let temp = ''
    switch (project.state.toString()) {
      case 'PROCESSING':
        temp = '#BBFDB9';
        break;
      case 'CLOSED':
        temp = '#619360';
        break;
      case 'PENDING':
        temp = 'white';
        break;
    }
    return temp;
  }

  public getAccountName(projectMember: ProjectMember): string {
    return projectMember.employee.account.accountName;
  }

  public setFilterByState() {
    if (!this.checkProcessing && !this.checkClosed && !this.checkPending) {
      this.displayProject = this.projectAndMembers;
    } else {
      this.displayProject = [];
      this.projectAndMembers.forEach(element => {
        if (this.checkProcessing && element.project.state.toString() === 'PROCESSING') {
          this.displayProject.push(element);
        }
        if (this.checkClosed && element.project.state.toString() === 'CLOSED') {
          this.displayProject.push(element);
        }
        if (this.checkPending && element.project.state.toString() === 'PENDING') {
          this.displayProject.push(element);
        }
      });
    }
    this.changeClient(this.selectedValue);
  }

  public changeClient(value: any) {
    switch (value) {
      case 'a-to-z':
        this.displayProject.sort((a, b) => a.project.name.localeCompare(b.project.name));
        break;
      case 'z-to-a':
        this.displayProject.sort((a, b) => a.project.name.localeCompare(b.project.name) * -1);
        break;
      case 'old-to-new':
        this.displayProject.sort((b, a) => new Date(b.project.startDate).getTime() - new Date(a.project.startDate).getTime());
        break;
      case 'new-to-old':
        this.displayProject.sort((a, b) => new Date(b.project.startDate).getTime() - new Date(a.project.startDate).getTime());
        break;
    }
  }

  removeProject(id: string) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: id
    })
  }

  detailEmployee(id: string) {
    this.matDialog.open(DetailEmployeeDialogComponent, {
      height: "668px",
      width: "1125px",
      minHeight: "668px",
      minWidth: "1125px",
      data: {empId: id}
    })
  }

  addMemberToProject(projectId: string) {
    this.matDialog.open(AddMemberToProjectComponent, {
      height: "300px",
      width: "350px",
      data: projectId
    })
  }

  projectDetails(id: string) {
    this.matDialog.open(DetailProjectDialogComponent, {
      height: "668px",
      width: "1125px",
      minHeight: "668px",
      minWidth: "1125px",
      data: {prjId: id}
    });
  }
}
