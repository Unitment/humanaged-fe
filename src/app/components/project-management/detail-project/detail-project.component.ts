import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectMember } from 'src/app/model/projectMember/ProjectMember';
import { ProjectRole } from 'src/app/model/projectMember/ProjectRole';
import { ProjectService } from 'src/app/services/project.service';
import { DetailEmployeeDialogComponent } from '../../employee-management/detail-employee/detail-employee-dialog/detail-employee-dialog.component';
import { DetailProjectDialogComponent } from './detail-project-dialog/detail-project-dialog.component';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {

  constructor(private dialog: MatDialog, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  openProjectDetailDialog(prjId: string){
    let dialog = this.dialog.open(DetailProjectDialogComponent, {
      height: "668px",
      width:"1125px",
      minHeight: "668px",
      minWidth: "1125px"
      });
    this.projectService.getDetailProject(prjId).subscribe(p => {
      let pml = p.projectMember;

      pml.sort((a, b) => {
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

      dialog.componentInstance.project = p;
    });
  }

}
