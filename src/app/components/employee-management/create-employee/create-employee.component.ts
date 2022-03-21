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
  avatar: string = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";

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
        mail: ['', [Validators.required, Validators.email]],
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
      this.form.value.avatar = this.avatar;
      let createdAt = new Date();
      this.employeeService.saveEmployee(this.form.value).subscribe(
        // () => undefined,
        // () => undefined,

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
        this.districtList = data;
        this.wardList = []
      }
    )
  }

  getWard(code: any) {
    this.locationService.getWardByDistrict(code).subscribe(
      (data: any) => this.wardList = data
    )
  }

  openDialogChooseFile() {
    this.dialog.open(ImportFromFileDialogComponent);
  }

  selectFile(event: any) {
    let name = Date.now().toString();
    let file = event.target.files[0]
    if (file != undefined) {
      this.angularFireStorage.upload(name, file)
        .snapshotChanges().pipe(
        finalize(() => {
          this.angularFireStorage.ref(name).getDownloadURL().subscribe(
            (data) => {
              this.avatar = data
            }
          )
        })
      ).subscribe();
    } else {
      this.avatar = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";
    }
  }
}
