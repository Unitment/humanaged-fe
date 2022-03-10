import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {ProjectRole} from "../../../model/projectMember/ProjectRole";
import {ProjectMemberService} from "../../../services/project-member.service";
import {MemberDTO} from "../../../model/project/MemberDTO";

@Component({
  selector: 'app-add-member-to-project',
  templateUrl: './add-member-to-project.component.html',
  styleUrls: ['./add-member-to-project.component.css']
})
export class AddMemberToProjectComponent implements OnInit {

  employeeList: Array<EmployeeDropdown> = [];

  dropdowns: Array<EmployeeDropdown> = [];

  filteredEmployee: Array<EmployeeDropdown> = [];

  dropdownSettings: IDropdownSettings = {};

  roleList = [ProjectRole.MEMBER];
  roleChose: ProjectRole;

  isProjectHasLeader: boolean;


  constructor(
    private employeeService: EmployeeService,
    private projectMemberService: ProjectMemberService,
    private matDialogRef: MatDialogRef<AddMemberToProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private projectId: string
  ) {
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'account',
      maxHeight: 100,
      enableCheckAll: false,
      itemsShowLimit: 3,
      // limitSelection: 1,
      allowSearchFilter: true,
    }

    this.projectMemberService.isProjectHasLeader(this.projectId).subscribe(
      data => {
        this.isProjectHasLeader = data;
        this.getRoleList();
      }
    )

    this.employeeService.getAvailableEmployeeForProject(this.projectId).subscribe(
      data => {
        for (const employee of data) {
          this.employeeList.push({id: employee.id, account: employee.account.accountName})
        }
        this.dropdowns = this.employeeList;
      }
    )
  }

  onItemSelect() {
    if (this.filteredEmployee.length > 1) {
      this.roleList = [ProjectRole.MEMBER]
    } else {
      this.getRoleList();
    }
  }

  getRoleList() {
    if (this.isProjectHasLeader) {
      this.roleList = [ProjectRole.MEMBER]
    } else {
      this.roleList = [ProjectRole.MEMBER, ProjectRole.LEADER]
    }
  }

  addMember() {
    let memberDTO: MemberDTO[];
    let employeeID: string[] = [];
    for (const employeeDropdown of this.filteredEmployee) {
      employeeID.push(employeeDropdown.id)
    }
    console.log(employeeID);
    this.projectMemberService.addEmployeeToProject({
      projectID: this.projectId,
      employeeIDList: employeeID,
      role: this.roleChose
    }).subscribe();
    this.matDialogRef.close()
  }
}

interface EmployeeDropdown {
  id: string,
  account: string
}
