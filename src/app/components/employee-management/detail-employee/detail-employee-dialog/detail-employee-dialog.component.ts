import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee/Employee';
import { DetailEmployeeComponent } from '../detail-employee.component';

@Component({
  selector: 'app-detail-employee-dialog',
  templateUrl: './detail-employee-dialog.component.html',
  styleUrls: ['./detail-employee-dialog.component.css']
})
export class DetailEmployeeDialogComponent implements OnInit {
  public employee!: Employee;

  constructor() { }

  ngOnInit(): void {
  }
  
  projectDetailClick(prjId: string){
    
  }
}
