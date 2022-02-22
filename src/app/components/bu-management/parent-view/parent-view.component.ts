import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account/Account';
import { BusinessUnit } from 'src/app/model/businessUnit/BusinessUnit';
import { Employee } from 'src/app/model/employee/Employee';
import { ProjectMember } from 'src/app/model/projectMember/ProjectMember';
import { BuService } from 'src/app/services/bu.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectMemberService } from 'src/app/services/project-member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent implements OnInit {
  public businessUnits: BusinessUnit[]=[];
  public pms: ProjectMember[]=[];
  public pmAccounts: Employee[]=[];
  public supports: Employee[]=[];
  public BUL!:string;
  public BUName!:string;

  showFiller = false;
  name: Account[] =[];

  constructor(private buService:BuService
            , private pmService:ProjectMemberService
            , private employeeService: EmployeeService
            , private router: Router
            ) { }

  ngOnInit(): void {
    this.getBU();
    this.getPM();
    this.getSupport();
  }

  public getBU():void{
    this.buService.getBusinessUnits().subscribe(
      (response: BusinessUnit[]) => {
        this.businessUnits = response;
        this.BUL = this.businessUnits[0].bul.account.accountName;
        this.BUName = this.businessUnits[0].name;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getPM():void{
    this.pmService.getPMs().subscribe(
      (response: ProjectMember[]) => {
        this.pms = response;

        this.pms.forEach(element => {
          this.pmAccounts.push(element.employee)
        });
        const expected = new Set();
        this.pmAccounts = this.pmAccounts.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public getSupport():void{
    this.employeeService.getSupports().subscribe(
      (response: Employee[]) => {
        this.supports = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public listChildPage(id:string){
    this.router.navigate(['listProject',id]);
  }
  
}
