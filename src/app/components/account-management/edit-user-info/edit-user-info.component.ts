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
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit {
  employee: Employee;
  user:User
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private employeeService:EmployeeService,
    private cdr: ChangeDetectorRef,
    private tokenStorageService: TokenStorageService,
    private snackBar : MatSnackBar,
    private formBuilder:FormBuilder,
    private angularFireStorage: AngularFireStorage,


  ) { }

  account: Account = {
    accountName: '',
    password: '',
  };

  form: FormGroup;
  ava:string;
  MALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=faa92c25-0f68-4f5d-95ce-5505e120e85d";
  FEMALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_female_avatar_w3jk.svg?alt=media&token=ce9acefb-a1bb-4285-9c91-ad02212d9e6f";
  DEFAULT_DISPLAY_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";



  ngOnInit(): void {
  this.user=this.tokenStorageService.getUser();
  this.ava=this.user.avatar;
  const accountInfo = localStorage.getItem('accountInfo');
  this.employee = accountInfo ? JSON.parse(accountInfo) : null;
  console.log(this.ava);
  this.form = this.formBuilder.group({
    name: ['', Validators.required],
    mail:['',Validators.required]
  })

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

  saveInfo() {
    if (this.form.valid) {
      if (this.ava == '' || this.ava == this.MALE_AVATAR || this.ava == this.FEMALE_AVATAR) {
        if (this.form.value.gender == 'MALE') {
          console.log("male")
          this.ava = this.MALE_AVATAR;
        } else if (this.form.value.gender == 'FEMALE') {
          console.log("female")
          this.ava = this.FEMALE_AVATAR;
        } else {
          this.ava = this.DEFAULT_DISPLAY_AVATAR;
        }
      } else {
        this.uploadImage()
      }
      this.employeeService.updateEmployee(this.form.value).subscribe(
        data => console.log(data),
        () => undefined,
        () => this.snackBar.open("Update Successful", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        }))
      this.router.navigateByUrl('employee/employee-table');
    } else {
      console.log(this.form.value)
      this.snackBar.open("Please fill form correctly", "", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }
  }


  uploadImage() {
    let name = Date.now().toString();
    this.angularFireStorage.upload(name, this.ava)
      .snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(name).getDownloadURL().subscribe(
          (data) => {
            this.ava = data
          }
        )
      })
    ).subscribe();
  }

  selectFile(event: any) {
    let file = event.target.files[0]
    if (file != undefined) {
      this.ava = file;
    } else {
      this.ava = '';
    }
  }
}
