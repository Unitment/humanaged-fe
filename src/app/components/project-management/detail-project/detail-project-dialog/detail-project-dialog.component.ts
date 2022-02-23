import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project/Project';

@Component({
  selector: 'app-detail-project-dialog',
  templateUrl: './detail-project-dialog.component.html',
  styleUrls: ['./detail-project-dialog.component.css']
})
export class DetailProjectDialogComponent implements OnInit {
  public project!: Project;
  
  constructor() { }

  ngOnInit(): void {
  }

}
