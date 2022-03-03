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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openProjectDetailDialog(prjId: string){
    this.dialog.open(DetailProjectDialogComponent, {
      height: "668px",
      width:"1125px",
      minHeight: "668px",
      minWidth: "1125px",
      autoFocus: false,
      restoreFocus: false,
      data: {prjId: prjId}
    });
  }

}
