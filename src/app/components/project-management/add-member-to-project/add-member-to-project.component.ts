import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectRole} from "../../../model/projectMember/ProjectRole";
import {ProjectMemberService} from "../../../services/project-member.service";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Employee} from "../../../model/employee/Employee";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-add-member-to-project',
  templateUrl: './add-member-to-project.component.html',
  styleUrls: ['./add-member-to-project.component.css']
})
export class AddMemberToProjectComponent implements OnInit {


  member = ProjectRole.MEMBER;
  leader = ProjectRole.LEADER;
  roleChose = ProjectRole.MEMBER;


  isProjectHasLeader: boolean;

  separatorKeysCodes: number[] = [ENTER, COMMA]
  employeeCtrl = new FormControl();
  employees: Array<Employee> = [];
  allEmployee: Array<Employee> = [];
  filteredEmployee: Observable<Array<Employee>>

  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>

  constructor(
    private employeeService: EmployeeService,
    private projectMemberService: ProjectMemberService,
    private matDialogRef: MatDialogRef<AddMemberToProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private projectId: string
  ) {
  }

  ngOnInit(): void {
    this.filteredEmployee = this.employeeCtrl.valueChanges.pipe(
      startWith(''),
      map((account: string) => this._filter(account)),
    );

    this.projectMemberService.isProjectHasLeader(this.projectId).subscribe(
      data => {
        this.isProjectHasLeader = data;
      }
    )

    this.employeeService.getAvailableEmployeeForProject(this.projectId).subscribe(
      data => {
        this.allEmployee = data;
      }
    )
  }

  addMember() {
    let employeeID: string[] = [];
    for (const employee of this.employees) {
      employeeID.push(employee.id)
    }

    this.projectMemberService.addEmployeeToProject({
      projectID: this.projectId,
      employeeIDList: employeeID,
      role: this.roleChose
    }).subscribe();
    this.matDialogRef.close()
  }

  selected(event: any) {
    this.employeeInput.nativeElement.blur();
    this.employees.push(event.option.value);
    console.log(event.option.value.id)
    this.allEmployee.splice(this.allEmployee.findIndex(e => e.id === event.option.value.id), 1)
    this.employeeInput.nativeElement.value = '';
    this.employeeCtrl.setValue('');
  }

  remove(employee: Employee) {
    this.employees.splice(this.employees.findIndex(e => e.id === employee.id), 1)
    this.allEmployee.push(employee)
  }

  private _filter(account: string) {
    return this.allEmployee.filter(employee => employee.account.accountName.includes(account));
  }
}
