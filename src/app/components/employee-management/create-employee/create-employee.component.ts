import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../services/employee.service";
import {LocationService} from "../../../services/location.service";
import {ImportFromFileDialogComponent} from "./import-from-file-dialog/import-from-file-dialog.component";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],

})
export class CreateEmployeeComponent implements OnInit {
  form: FormGroup;

  provinceList: Array<any> = [];
  districtList: Array<any> = [];
  wardList: Array<any> = [];
  avatar: string = "";
  DEFAULT_DISPLAY_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";
  MALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=faa92c25-0f68-4f5d-95ce-5505e120e85d";
  FEMALE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/undraw_female_avatar_w3jk.svg?alt=media&token=ce9acefb-a1bb-4285-9c91-ad02212d9e6f";

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private angularFireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
        birthday: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("(\\d{3}) (\\d{3})( \\d{4})")]],
        personalMail: ['', [Validators.required, Validators.email]],
        province: ['', Validators.required],
        district: ['', Validators.required],
        ward: ['', Validators.required],
        address: ['', Validators.required],
        avatar: ['']
      }
    )

    this.locationService.getAllProvince().subscribe(
      data => this.provinceList = data
    )
  }

  saveEmployee() {
    if (this.form.valid) {
      if (this.avatar == '') {
        if (this.form.value.gender == 'MALE') {
          this.avatar = this.MALE_AVATAR;
        } else if (this.form.value.gender == 'FEMALE') {
          this.avatar = this.FEMALE_AVATAR;
        } else {
          this.avatar = this.DEFAULT_DISPLAY_AVATAR;
        }
      } else {
        this.uploadImage()
      }
      this.form.value.avatar = this.avatar;

      this.employeeService.saveEmployee(this.form.value).subscribe(
        (data) => {
          this.employeeService.employeeSubject.next(data);
          this.snackBar.open("Add Successful", "OK", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
        })
      this.route.navigateByUrl("/employee/table");
    } else {
      this.snackBar.open("Please fill form correctly", "", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }
  }

  getDistrict(code: any) {
    this.locationService.getDistrictByProvince(code).subscribe(
      (data: any) => {
        console.log(data)
        this.districtList = data;
        this.wardList = []
      }
    )
  }

  getWard(code: any) {
    this.locationService.getWardByDistrict(code).subscribe(
      (data: any) => {
        console.log('get new wards')
        this.wardList = data
      }
    )
  }

  openDialogChooseFile() {
    this.dialog.open(ImportFromFileDialogComponent);
  }

  selectFile(event: any) {
    let file = event.target.files[0]
    if (file != undefined) {
      this.avatar = file;
    } else {
      this.avatar = "";
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
}
