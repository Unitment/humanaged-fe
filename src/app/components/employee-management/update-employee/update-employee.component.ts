import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../services/employee.service";
import {LocationService} from "../../../services/location.service";
import {Employee} from "../../../model/employee/Employee";
import {Location} from "@angular/common";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {
  ImportFromFileDialogComponent
} from "../create-employee/import-from-file-dialog/import-from-file-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  form: FormGroup;

  provinceList: Array<any> = [];
  districtList: Array<any> = [];
  wardList: Array<any> = [];
  avatar: string = "";
  MALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=faa92c25-0f68-4f5d-95ce-5505e120e85d";
  FEMALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_female_avatar_w3jk.svg?alt=media&token=ce9acefb-a1bb-4285-9c91-ad02212d9e6f";
  DEFAULT_DISPLAY_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private route: Router,
              private angularFireStorage: AngularFireStorage,
              private dialog: MatDialog,
              private tokenStorageService: TokenStorageService
    ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        id: [],
        name: {value: null, disabled: true},
        gender: ['', Validators.required],
        birthday: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("(\\d{3}) (\\d{3})( \\d{4})")]],
        mail: {value: null, disabled: true},
        province: ['', Validators.required],
        district: ['', Validators.required],
        ward: ['', Validators.required],
        address: ['', Validators.required],
        avatar: []
      }
    )

    this.locationService.getAllProvince().subscribe(
      data => this.provinceList = data
    )

    this.employeeService.getUpdateEmployee(this.activatedRoute.snapshot.params['id']).subscribe(
      (data: Employee) => {
        this.avatar = data.avatar == null ? '' : data.avatar;
        this.getDistrict(data.province?.id);
        this.getWard(data.district?.id)
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
          avatar: this.avatar
        });
      }
    )
  }

  saveEmployee() {
    if (this.form.valid) {
      if (this.avatar == '' || this.avatar == this.MALE_AVATAR || this.avatar == this.FEMALE_AVATAR) {
        if (this.form.value.gender == 'MALE') {
          console.log("male")
          this.avatar = this.MALE_AVATAR;
        } else if (this.form.value.gender == 'FEMALE') {
          console.log("female")
          this.avatar = this.FEMALE_AVATAR;
        } else {
          this.avatar = this.DEFAULT_DISPLAY_AVATAR;
        }
      } else {
        this.uploadImage()
      }
      this.form.value.avatar = this.avatar;
      this.employeeService.updateEmployee(this.form.value).subscribe(
        data => {
          if (data.id===this.tokenStorageService.getUser().id) {
            this.accountService.accountSubject.next(data);
            localStorage.setItem('accountInfo',JSON.stringify(data));
          }
        },
        () => undefined,
        () => this.snackBar.open("Update Successful", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        }))
        setTimeout(()=> {
        this.route.navigateByUrl('employee/table');
        },50)
    } else {
      this.snackBar.open("Please fill form correctly", "OK", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
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

  selectFile(event: any) {
    let file = event.target.files[0]
    if (file != undefined) {
      this.avatar = file;
      this.uploadImage()
    } else {
      this.avatar = '';
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

  compareLocation(l1: any, l2: any): boolean {
    return l1.id === l2.id;
  }

  openDialogChooseFile() {
    this.dialog.open(ImportFromFileDialogComponent);
  }
}
