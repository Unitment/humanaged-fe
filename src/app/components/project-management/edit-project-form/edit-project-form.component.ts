import { EmployeeInProject } from './../../../model/project/Project';
import { ProjectService } from './../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/model/project/Project';
import { ProjectState } from 'src/app/model/project/ProjectState';
import { ProjectRole } from 'src/app/model/projectMember/ProjectRole';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrls: ['./edit-project-form.component.css'],
})
export class EditProjectFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  projectId: string | null = null;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    if (routeParams.get('id') !== null) {
      this.projectId = routeParams.get('id');
      this.isLoading = true;
      this.projectService.getProjectById(this.projectId).subscribe(
        (data) => {
          this.project = data;
          this.projectForm.patchValue({
            projectInfo: {
              ...data,
            },
            employeeInProjectList: data.projectMembers?.forEach((member) => {
              this.employeesInProject.push(
                this.fb.group({
                  employeeName: [member.employee?.id, Validators.required],
                  employeeRole: [
                    this.projectRole.find(
                      (key) => key === member.role.toString()
                    ),
                    Validators.required,
                  ],
                })
              );
            }),
          });
        },
        (error) => console.log(error),
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  project: Project = {};
  isLoading: boolean = false;
  matcher = new MyErrorStateMatcher();

  projectRole: string[] = Object.keys(ProjectRole).filter((key) => isNaN(+key));
  projectState: string[] = Object.keys(ProjectState).filter((key) =>
    isNaN(+key)
  );

  projectForm = this.fb.group({
    projectInfo: this.fb.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.maxLength(500)],
    }),
    employeesInProject: this.fb.array([]),
  });

  get employeesInProject() {
    return this.projectForm.get('employeesInProject') as FormArray;
  }

  addEmployee(event: Event) {
    event.preventDefault();
    this.employeesInProject.push(
      this.fb.group({
        employeeName: ['', Validators.required],
        employeeRole: ['', Validators.required],
      })
    );
  }

  removeEmployee(index: number, event: Event) {
    event.preventDefault();
    this.employeesInProject.removeAt(index);
  }

  openDialog(index: number, event: Event): void {
    event.preventDefault();
    if (!this.employeesInProject.at(index).value.employeeName) {
      this.removeEmployee(index, event);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        name: this.employeesInProject.at(index).get('employeeName')?.value,
        index,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.index === index) {
        this.removeEmployee(index, event);
      }
    });
  }

  onSubmit(event: Event) {
    // event.preventDefault();
    if (!this.projectForm.valid) return;
    const employeeInProjectList = [];
    for (let i = 0; i < this.employeesInProject.length; i++) {
      let value = this.employeesInProject.at(i).value;
      let employeeRole: string = value.employeeRole;
      employeeInProjectList.push({
        id: value.employeeName,
        role: this.projectRole.findIndex((key) => key === employeeRole),
      });
    }

    this.project = {
      id: this.projectId,
      ...this.projectForm.get('projectInfo')?.value,
      state: this.projectState.findIndex(
        (key) =>
          key === this.projectForm.get('projectInfo')?.get('state')?.value
      ),
      employeeInProjectList: employeeInProjectList,
    };

    this.projectId !== null
      ? this.editProject(this.project)
      : this.saveProject(this.project);
  }

  saveProject(project: Project) {
    this.isLoading = true;
    this.projectService.saveProject(project).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
        this.projectForm.reset();
        this.employeesInProject.clear();
        this.router.navigate(['/']);
      }
    );
  }

  editProject(project: Project) {
    console.log(project);

    this.projectService.editProject(project).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    );
  }

  arrayBuffer: any;
  file!: File;
  incomingFile(event: any) {
    this.file = event.target.files[0];
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      let EmployeeInProjectInFile: EmployeeInProject[] =
        XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
        });
      this.disPlayEmployeeInProjectInFile(EmployeeInProjectInFile);
    };
    fileReader.readAsArrayBuffer(this.file);
    console.log(this.file);
  }

  disPlayEmployeeInProjectInFile(list: EmployeeInProject[]): void {
    list.forEach((employee) => {
      this.employeesInProject.push(
        this.fb.group({
          employeeName: employee.id,
          employeeRole: this.projectRole.find(
            (key) => key === employee.role?.toString()
          ),
        })
      );
    });
  }

  onDeleteClick(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        name: this.projectForm.get('projectInfo')?.get('name')?.value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (
        result?.name === this.projectForm.get('projectInfo')?.get('name')?.value
      ) {
        this.isLoading = true;
        this.projectService.deleteProject(this.project).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => console.log(error),
          () => {
            this.isLoading = false;
            this.router.navigate(['/']);
          }
        );
      }
    });
  }

  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
