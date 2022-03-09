import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Employee} from 'src/app/model/employee/Employee';
import {Project} from 'src/app/model/project/Project';
import {ProjectAndMember} from 'src/app/model/projectMember/ProjectAndMember';
import {ProjectMember} from 'src/app/model/projectMember/ProjectMember';
import {EmployeeService} from 'src/app/services/employee.service';
import {ProjectMemberService} from 'src/app/services/project-member.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../project-management/confirm-dialog/confirm-dialog.component";
import {
  DetailEmployeeDialogComponent
} from "../../employee-management/detail-employee-dialog/detail-employee-dialog.component";
import {
  AddMemberToProjectComponent
} from "../../project-management/add-member-to-project/add-member-to-project.component";
import {
  DetailProjectDialogComponent
} from "../../project-management/detail-project-dialog/detail-project-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { DialogService } from 'src/app/services/dialog.service';
import {ProjectService} from "../../../services/project.service";
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
  showProJ = 2;
  showMem = 1;
  showMemMap = new Map();
  textValue: string = '';
  ops = [
    {value: 'a-to-z', viewValue: 'A to Z'},
    {value: 'z-to-a', viewValue: 'Z to A'},
    {value: 'old-to-new', viewValue: 'Oldest to Newest'},
    {value: 'new-to-old', viewValue: 'Newest to Oldest'}
  ]

  constructor(
    private empService: EmployeeService,
    private pmService: ProjectMemberService,
    private projectService:ProjectService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
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
        this.snackBar.open(error.message, 'Close');
      }
    );
  }


  public getprojectAndMember(id: string): void {
    this.pmService.getProjectAndMember(id).subscribe(
      (response: ProjectAndMember[]) => {
        this.projectAndMembers = response;
        this.displayProject = this.projectAndMembers;
        this.displayProject.forEach(project => {
          this.showMemMap.set(project.project.id,this.showMem);
        })
        this.changeClient(this.selectedValue);
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close');
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
        temp = '#C8DBBD';
        break;
      case 'CLOSED':
        temp = '#8FA96E';
        break;
      case 'PENDING':
        temp = '#dce7ed';
        break;
    }
    return temp;
  }

  public getAccountName(projectMember: ProjectMember): string {    
    return projectMember.employee.account.accountName;
  }

  public setFilterByState() {
    // this.searchAccount();
    if (!this.checkProcessing && !this.checkClosed && !this.checkPending) {
      if (this.textValue?.toString() !== '') {
        this.searchAccount();
      } else {
        this.getprojectAndMember(this.PMid);
      }
    } else {
      if (this.textValue?.toString() !== '') {
        this.searchAccount();
      } else {
        this.displayProject = [];
        // for(let i=0; i<this.displayProject.length;i++){
        //   if (!this.checkProcessing && this.displayProject[i]?.project.state.toString() === 'PROCESSING') {
        //     this.displayProject.splice(i,1);
        //     i--;
        //   }
        //   if (!this.checkClosed && this.displayProject[i]?.project.state.toString() === 'CLOSED') {
        //     this.displayProject.splice(i,1);
        //     i--;
        //   }
        //   if (!this.checkPending && this.displayProject[i]?.project.state.toString() === 'PENDING') {
        //     this.displayProject.splice(i,1);
        //     i--;
        //   }
        // }
        this.projectAndMembers.forEach(value => {
          if (this.checkProcessing && value.project.state.toString() === 'PROCESSING') {
            this.displayProject.push(value);
          }
          if (this.checkPending && value.project.state.toString() === 'PENDING') {
            this.displayProject.push(value);
          }
          if (this.checkClosed && value.project.state.toString() === 'CLOSED') {
            this.displayProject.push(value);
          }
        });
        console.log('setFilterByState: ' + this.displayProject.length)

      }

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

  // removeProject(project: Project) {
  //   this.matDialog.open(ConfirmDialogComponent, {
  //     data: project.id
  //   })
  // }
  removeProject(project: Project) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        name: project.name,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.name === project.name) {
        this.projectService.deleteProject(project).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            this.snackBar.open(error.error.message, 'OK');
            console.log(error);
          },
          () => {
            this.ngOnInit();
          }
        );
      }
    });
    }

  removeEmployeeFromProject(eid: string, pid: string) {
    this.dialogService.openConfirmDialog( {
      data: {
        title: `Remove Employee ${eid}`,
        content: `Do you want to remove Employee ${eid} from Project ${pid}?`,
        id: eid
      }
    } as MatDialogConfig).afterClosed().subscribe(result => {
      if(result) //if accept button clicked
      {      
        this.pmService.deleteEmployeeInProject(eid, pid).subscribe(
        (response) => {
          console.log('delete ' + response);
          //update hide deleted employee node
          this.pmService.getMemberByProjectId(pid).subscribe(pm => {
            let projectHaveDeletedEmployee = this.displayProject.find(
              pAm => pAm.project.id == pid
            )?.memberList;
            console.log(projectHaveDeletedEmployee);
            
            projectHaveDeletedEmployee?.splice(0, projectHaveDeletedEmployee.length, ...pm);
            console.log(projectHaveDeletedEmployee, " add by ", pm);
          })
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Error');
          console.log(error);
        });
      }
    });
  }

  detailEmployee(id: string) {
    this.dialogService.openEmployeeDetailDialog(id);
  }

  addMemberToProject(projectId: string) {
    this.matDialog.open(AddMemberToProjectComponent, {
      height: "300px",
      width: "350px",
      data: projectId
    }).afterClosed().subscribe( ()=> this.ngOnInit());

  }

  detailProject(id: string) {
    this.dialogService.openProjectDetailDialog(id);
  }

  increaseShowProJ() {
    this.showProJ += 3;
  }

  increaseShowMem() {
    this.showMem += 1;
  }

  increaseShowMemValue(id:string):void{
    let showNum = this.showMemMap.get(id)+2;
    this.showMemMap.set(id,showNum);
    // return 2;
  }

  public searchAccount(): void {
    if (this.textValue?.toString() === '') {
      this.setFilterByState();
    } else {
      this.displayProject = [];
      this.projectAndMembers.forEach(element => {
        let match: ProjectMember[] = [];
        element.memberList.forEach(member => {
          if (member.employee.account.accountName.toLowerCase().indexOf(this.textValue.toLowerCase()) !== -1) {
            match.push(member);
            // console.log(key+' Match: '+member.employee.account.accountName +' '+ element.memberList.length)
          }
        });
        if (match.length > 0) {
          let tempProject: ProjectAndMember = new class implements ProjectAndMember {
            memberList: ProjectMember[];
            project: Project;
          };
          tempProject.project = element.project;
          tempProject.memberList = match;
          if (!this.checkProcessing && !this.checkClosed && !this.checkPending) {
            this.displayProject.push(tempProject);
          } else {
            if (this.checkProcessing && tempProject.project.state.toString() === 'PROCESSING') {
              this.displayProject.push(tempProject);
            }
            if (this.checkPending && tempProject.project.state.toString() === 'PENDING') {
              this.displayProject.push(tempProject);
            }
            if (this.checkClosed && tempProject.project.state.toString() === 'CLOSED') {
              this.displayProject.push(tempProject);
            }
          }
        }
      });
    }
  }

  nodeColor(role: string):string {
    let color:string = '';
    switch (role) {
      case 'PM': color = '#99A3A4';
        break;
      case 'LEADER': color = '#F2D06B';
        break;
      case 'MEMBER': color = '#F2ECCE';
        break;
    }
    return color;
  }
}
