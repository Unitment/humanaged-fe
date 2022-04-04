import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Account } from 'src/app/model/account/Account';
import { Employee } from 'src/app/model/employee/Employee';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';



@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit {
  employee: Employee;
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private employeeService:EmployeeService,
    private cdr: ChangeDetectorRef,
    private tokenStorageService: TokenStorageService,
    private snackBar : MatSnackBar,
    private locationService: LocationService,
    private formBuilder:FormBuilder,
    private angularFireStorage: AngularFireStorage,


  ) { }

  account: Account = {
    accountName: '',
    password: '',
  };

  provinceList: Array<any> = [];
  districtList: Array<any> = [];
  wardList: Array<any> = [];
  form: FormGroup;
  ava:string;
  MALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=faa92c25-0f68-4f5d-95ce-5505e120e85d";
  FEMALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_female_avatar_w3jk.svg?alt=media&token=ce9acefb-a1bb-4285-9c91-ad02212d9e6f";
  DEFAULT_DISPLAY_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";



  ngOnInit(): void {
  // this.user=this.tokenStorageService.getUser();
  // this.ava=this.user.avatar;
  const accountInfo = localStorage.getItem('accountInfo');
  this.employee = accountInfo ? JSON.parse(accountInfo) : null;
  this.form = this.formBuilder.group({
    id: [],
    name: [],
    gender: ['', Validators.required],
    birthday: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern("(\\d{3}) (\\d{3})( \\d{4})")]],
    mail: [],
    province: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
    address: ['', Validators.required],
    account: [],
    country: [],
    status: [],
    avatar: ['']
  })

  this.locationService.getAllProvince().subscribe(
    data => this.provinceList = data
  )

  this.employeeService.getEmployeeById(this.employee.id).subscribe(
    (data: Employee) => {
      this.ava = data.avatar == null ? '' : data.avatar;
      this.getDistrict(data.province?.id);
      this.getWard(data.district?.id);
      this.form.setValue({
          id: data.id,
          name: data.name,
          gender: data.gender,
          birthday: data.birthday,
          phoneNumber: data.phoneNumber,
          mail: data.mail,
          province: data.province,
          district: data.district,
          ward: data.ward,
          address: data.address,
          account: data.account,
          country: data.country,
          status: data.status,
          avatar: this.ava
      });
      // console.log(data)
    }
  )



    // this.ava = ava ? JSON.parse(ava) : null;
    // console.log(this.employee);
    // this.cdr.markForCheck();
  }



  saveInfo() {
    if (this.form.valid) {
      if (this.ava == '' || this.ava == this.MALE_AVATAR || this.ava == this.FEMALE_AVATAR) {
        if (this.form.value.gender == 'MALE') {
          this.ava = this.MALE_AVATAR;
        } else if (this.form.value.gender == 'FEMALE') {
          this.ava = this.FEMALE_AVATAR;
          console.log(this.ava)
        } else {
          this.ava = this.DEFAULT_DISPLAY_AVATAR;
        }
      } else {
        this.uploadImage()
      }
      this.employeeService.updateEmployee(this.form.value).subscribe(
        data => {
          localStorage.setItem('accountInfo',JSON.stringify(data))
        },
        () => undefined,
        () => this.snackBar.open("Update Successful", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        }))
        setTimeout(() => {
          this.router.navigateByUrl('account/info');
        }, 100);
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

  getDistrict(code: any) {
    this.locationService.getDistrictByProvince(code).subscribe(
      (data: any) => {
        console.log("get new district list")
        this.districtList = data;
        this.wardList = [];
      }
    )
  }

  getWard(code: any) {
    this.locationService.getWardByDistrict(code).subscribe(
      (data: any) => {
        console.log("get new ward list")
        this.wardList = data
      }
    )
  }

  compareLocation(l1: any, l2: any): boolean {
    return l1.id === l2.id;
  }

}
