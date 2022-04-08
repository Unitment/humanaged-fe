import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Employee} from 'src/app/model/employee/Employee';
import {AccountService} from 'src/app/services/account.service';
import {EmployeeService} from 'src/app/services/employee.service';
import {LocationService} from 'src/app/services/location.service';
import {AuthService} from "../../../auth/_services/auth.service";
import {AuthStorageService} from "../../../auth/_services/auth-storage.service";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  employee: Employee;
  private cdr: ChangeDetectorRef;
  isEdit = false;
  provinceList: Array<any> = [];
  districtList: Array<any> = [];
  wardList: Array<any> = [];
  form: FormGroup;
  avatar: string;
  MALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=faa92c25-0f68-4f5d-95ce-5505e120e85d";
  FEMALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_female_avatar_w3jk.svg?alt=media&token=ce9acefb-a1bb-4285-9c91-ad02212d9e6f";
  DEFAULT_DISPLAY_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private angularFireStorage: AngularFireStorage,
    private accountService: AccountService,
    private authService: AuthService,
    private authStorageService: AuthStorageService
  ) {
  }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [],
      name: [],
      accountName: [],
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

    this.employeeService.getCurrentAccountEmployee().subscribe(
      (data: Employee) => {
        this.avatar = data.avatar == null ? '' : data.avatar;
        this.getDistrict(data.province?.id);
        this.getWard(data.district?.id);
        this.form.setValue({
          id: data.id,
          name: data.name,
          accountName: data.account.accountName,
          gender: data.gender,
          birthday: data.birthday,
          phoneNumber: data.phoneNumber,
          personalMail: data.personalMail,
          companyMail: data.companyMail,
          province: data.province,
          district: data.district,
          ward: data.ward,
          address: data.address,
          account: data.account,
          country: data.country,
          status: data.status,
          avatar: this.avatar
        });
        console.log(this.form.value)
      }
    )
  }

  saveInfo() {
    if (this.form.valid) {
      if (this.avatar == '' || this.avatar == this.MALE_AVATAR || this.avatar == this.FEMALE_AVATAR) {
        if (this.form.value.gender == 'MALE') {
          this.avatar = this.MALE_AVATAR;
        } else if (this.form.value.gender == 'FEMALE') {
          this.avatar = this.FEMALE_AVATAR;
          console.log(this.avatar)
        } else {
          this.avatar = this.DEFAULT_DISPLAY_AVATAR;
        }
      } else {
        this.uploadImage()
      }
      this.form.value.avatar = this.avatar;
      this.employeeService.updateEmployee(this.form.value).subscribe(
        data => {
          this.authStorageService.observeUser(data);
        },
        () => undefined,
        () => this.snackBar.open("Update Successful", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        }))
      setTimeout(() => {
        this.router.navigateByUrl('account/info');
      }, 200);
      this.isEdit = false;
    } else {
      this.snackBar.open("Please fill form correctly", "", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
      this.isEdit = true;
    }
  }

  uploadImage() {
    let name = Date.now().toString();
    this.angularFireStorage.upload(name, this.avatar)
      .snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(name).getDownloadURL().subscribe(
          (data) => {
            this.avatar = data
          }
        )
      })
    ).subscribe();
  }

  editInfo() {
    this.isEdit = true;
    this.snackBar.open("You can edit now", "OK", {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    })
  }

  selectFile(event: any) {
    let file = event.target.files[0]
    if (file != undefined) {
      this.avatar = file;
    } else {
      this.avatar = '';
    }
  }

  getDistrict(code: any) {
    this.locationService.getDistrictByProvince(code).subscribe(
      (data: any) => {
        this.districtList = data;
        this.wardList = [];
      }
    )
  }

  getWard(code: any) {
    this.locationService.getWardByDistrict(code).subscribe(
      (data: any) => {
        this.wardList = data
      }
    )
  }

  compareLocation(l1: any, l2: any): boolean {
    return l1.id === l2.id;
  }

}
