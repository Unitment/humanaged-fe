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
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent implements OnInit {
  public businessUnits: BusinessUnit[] = [];
  public pms: ProjectMember[] = [];
  public pmAccounts: Employee[] = [];
  public displayPmAccounts: Employee[] = [];
  public supports: Employee[] = [];
  public displaySupports: Employee[] = [];
  public BUL: Employee;
  public BUName: string = '';

  showFiller = false;
  name: Account[] = [];
  searchText2: any;
  showPM =2;
  showSP =2;
  ops = [
    {value: 'pm', viewValue: 'Only PM'},
    {value: 'sp', viewValue: 'Only Support'},
    {value: 'both', viewValue: 'PM and Support'},
  ]
  textValue: string = '';
  selectedValue: string = 'both';

  constructor(private buService: BuService,
              private pmService: ProjectMemberService,
              private employeeService: EmployeeService,
              private router: Router,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.getBU();
    this.getPM();
    this.getSupport();
  }

  public getBU(): void {
    this.buService.getBusinessUnits().subscribe(
      (response: BusinessUnit[]) => {
        this.businessUnits = response;
        this.BUL = this.businessUnits[0].bul;
        this.BUName = this.businessUnits[0].name;
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        this.snackBar.open(error.message,'Close');
      }
    )
  }

  public getPM(): void {
    this.pmService.getPMs().subscribe(
      (response: ProjectMember[]) => {
        this.pms = response;

        this.pms.forEach(element => {
          this.pmAccounts.push(element.employee)
        });
        const expected = new Set();
        this.pmAccounts = this.pmAccounts.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
        console.log(this.pmAccounts);
        this.displayPmAccounts = this.pmAccounts;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Get PM error!\n'+error.message,'Close');
      }
    )

  }

  public getSupport(): void {
    this.employeeService.getSupports().subscribe(
      (response: Employee[]) => {
        this.supports = response;
        this.displaySupports = this.supports;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Get support error!\n'+error.message,'Close');
      }
    )
  }

  public searchPM(key: string): void {
    this.displayPmAccounts = [];
    this.pmAccounts.forEach(element => {
      if (element.account.accountName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        this.displayPmAccounts.push(element);
      }
    });
  }

  public searchSupport(key: string): void {
    this.displaySupports = [];
    this.supports.forEach(element => {
      if (element.account.accountName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        this.displaySupports.push(element);
      }
    });
  }

  searchAccount() {
    switch (this.selectedValue) {
      case 'pm':
        this.searchPM(this.textValue);
        this.searchSupport('*');
        break;
      case 'sp':
        this.searchSupport(this.textValue);
        this.searchPM('*');
        break;
      case 'both':
        this.searchPM(this.textValue);
        this.searchSupport(this.textValue);
        break;
    }
  }

  public changeClient(event: string) {
    switch (event) {
      case 'pm':
        this.searchPM(this.textValue);
        this.searchSupport('*');
        break;
      case 'sp':
        this.searchSupport(this.textValue);
        this.searchPM('*');
        break;
      case 'both':
        this.searchPM(this.textValue);
        this.searchSupport(this.textValue);
        break;
    }
  }

  detailEmployee(id: string) {
    console.log(id);
    
    this.dialogService.openEmployeeDetailDialog(id);
  }

  removeEmployeeFromSupport(eid: String){
    this.dialogService.openConfirmDialog( {
      data: {
        title: `Remove Employee ${eid}`,
        content: `Do you want to remove Employee ${eid} from Support?`,
        id: eid
      }
    } as MatDialogConfig).afterClosed().subscribe(result => {
      if(result) //if accept button clicked
      {
        this.employeeService.removeEmployee(eid).subscribe(
        (response) => {
          console.log('delete ' + response);
          //update hide deleted employee node
          this.getSupport();
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Error');
          console.log(error);
        });
      }
    });
  }

  increaseShowPM(){
    this.showPM+=3;
  }
  increaseShowSP(){
    this.showSP+=3;
  }

  nodeColor(role:string):string {
    let color:string = '';
    switch (role) {
      case 'BUL': color = '#E59C84';
        break;
      case 'PM': color = '#A8BE96';
        break;
      case 'SUPPORT': color = '#F2ECCE';
        break;
    }
    return color;
  }
}
