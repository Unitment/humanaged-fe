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
  public displayPmAccounts: Employee[]=[];
  public supports: Employee[]=[];
  public displaySupports: Employee[]=[];
  public BUL:string='';
  public BUName:string='';

  showFiller = false;
  name: Account[] =[];
  searchText2:any;
  ops = [
    {value: 'pm', viewValue: 'Only PM'},
    {value: 'sp', viewValue: 'Only Support'},
    {value: 'both', viewValue: 'PM and Support'},
  ]
  textValue: string = '';
  selectedValue: string = 'both';
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
        this.displayPmAccounts = this.pmAccounts;

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
        this.displaySupports = this.supports;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchPM(key:string):void{
    this.displayPmAccounts = [];
    this.pmAccounts.forEach(element => {
      if(element.account.accountName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        this.displayPmAccounts.push(element);
      }
    });
  }

  public searchSupport(key:string):void{
    this.displaySupports = [];
    this.supports.forEach(element => {
      if(element.account.accountName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        this.displaySupports.push(element);
      }
    });
  }

  searchAccount(){
    switch(this.selectedValue){
      case 'pm': this.searchPM(this.textValue);
        this.searchSupport('*');
        break;
      case 'sp': this.searchSupport(this.textValue);
        this.searchPM('*');
        break;
      case 'both': this.searchPM(this.textValue);
        this.searchSupport(this.textValue);
        break;
    }
  }

  public changeClient(event:string){
    switch(event){
      case 'pm': this.searchPM(this.textValue);
        this.searchSupport('*');
        break;
      case 'sp': this.searchSupport(this.textValue);
        this.searchPM('*');
        break;
      case 'both': this.searchPM(this.textValue);
        this.searchSupport(this.textValue);
        break;
    }
  }
}
