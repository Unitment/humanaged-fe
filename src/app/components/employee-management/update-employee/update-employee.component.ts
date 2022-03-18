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
  avatar: string = "https://firebasestorage.googleapis.com/v0/b/humanaged-d9db7.appspot.com/o/profile.svg?alt=media&token=16bc5a31-510f-4250-bbfc-57d79f078710";

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private route: Router,
              private angularFireStorage: AngularFireStorage,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        id: [],
        name: ['', Validators.required],
        gender: ['', Validators.required],
        birthday: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("(\\d{3}) (\\d{3})( \\d{4})")]],
        mail: ['', [Validators.required, Validators.email]],
        province: ['', Validators.required],
        district: ['', Validators.required],
        ward: ['', Validators.required],
        address: ['', Validators.required],
        account: [],
        country: [],
        status: [],
        avatar: ['']
      }
    )

    // this.locationService.getAllProvince().subscribe(
    //   data => this.provinceList = data
    // )

    this.employeeService.getEmployeeById(this.activatedRoute.snapshot.params['id']).subscribe(
      (data: Employee) => {
        console.log(data)

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
          avatar: data.avatar
        });
      }
    )
  }

  saveEmployee() {
    if (this.form.valid) {
      this.form.value.avatar = this.avatar;
      this.employeeService.updateEmployee(this.form.value).subscribe(
        data => console.log(data),
        () => undefined,
        () => this.snackBar.open("Update Successful", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        }))
      this.route.navigateByUrl('employee/table');
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

  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
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


  openDialogChooseFile() {
    this.dialog.open(ImportFromFileDialogComponent);
  }
}
