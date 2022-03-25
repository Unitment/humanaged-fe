import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Account } from 'src/app/model/account/Account';
import { Employee } from 'src/app/model/employee/Employee';
import { User } from 'src/app/model/employee/User';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  employee: Employee;
  user:User
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private employeeService:EmployeeService,
    private cdr: ChangeDetectorRef,
    private tokenStorageService: TokenStorageService,
    private snackBar : MatSnackBar,
    private formBuilder:FormBuilder

  ) { }

  account: Account = {
    accountName: '',
    password: '',
  };

  form: FormGroup;
  ava:string;



  ngOnInit(): void {
    const accountInfo = localStorage.getItem('accountInfo');
    this.employee = accountInfo ? JSON.parse(accountInfo) : null;
    this.user=this.tokenStorageService.getUser();
    this.ava=this.user.avatar;


  // this.employeeService.getEmployeeById(this.activatedRoute.snapshot.params['id']).subscribe(
  //   (data: Employee) => {
  //     console.log(data)
  //   }
  // )



    // this.ava = ava ? JSON.parse(ava) : null;
    console.log(this.user);
    // this.cdr.markForCheck();
  }

  onEditClick(id: string) {
    this.router.navigate(['/employee/update', id]);
  }

  // accountInfo(id:string) {
  //   this.employeeService.getEmployeeById(id).subscribe (
  //     data => {
  //       localStorage.setItem('accountInfo',JSON.stringify(data));
  //       console.log(data);
  //     }
  //   )
  // }
}
