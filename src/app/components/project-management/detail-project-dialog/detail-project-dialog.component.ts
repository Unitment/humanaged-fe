import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model/project/Project';
import { ProjectRole } from 'src/app/model/projectMember/ProjectRole';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-detail-project-dialog',
  templateUrl: './detail-project-dialog.component.html',
  styleUrls: ['./detail-project-dialog.component.css']
})
export class DetailProjectDialogComponent implements OnInit {
  public project!: Project;
  
  constructor(private matDialog: MatDialog,
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<DetailProjectDialogComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: {prjId: string}) {

      this.projectService.getDetailProject(data.prjId).subscribe(p => {
        console.log(p);
        p.projectMembers.sort((a, b) => {
          console.log(a, " ", b)
          if(a.role == ProjectRole.PM){
            console.log("case 1: bigger");
            return -1;
          }
          else if(a.role == ProjectRole.LEADER && b.role != ProjectRole.PM){
            console.log("case 2: bigger");
            return -1;
          }
          else if (a.role == b.role){
            console.log("case 3: equal");
            return 0;
          }
          else{
            console.log("case 4: smaller")
            return 1;
          }
        })

        this.project = p; 
      });
    }

  ngOnInit(): void {
  }

  EmployeeDetailClick(empId: string){
    this.dialogRef.close()

    this.dialogService.openEmployeeDetailDialog(empId);
  }

  onClose(){
    this.dialogRef.close();
  }
}
