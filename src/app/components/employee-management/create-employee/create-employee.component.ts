import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../services/employee.service";
import {LocationService} from "../../../services/location.service";
import {ImportFromFileDialogComponent} from "./import-from-file-dialog/import-from-file-dialog.component";


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

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
        birthday: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("(\\d{3}) (\\d{3})( \\d{2}){2}")]],
        mail: ['', [Validators.required, Validators.email]],
        province: ['', Validators.required],
        district: ['', Validators.required],
        ward: ['', Validators.required],
        address: ['', Validators.required]
      }
    )

    this.locationService.getAllProvince().subscribe(
      data => this.provinceList = data
    )
  }

  saveEmployee() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.employeeService.saveEmployee(this.form.value).subscribe(
        data => console.log(data),
        () => undefined,
        () => this.snackBar.open("Add Successful", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        }))
      this.form.reset();
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
        this.districtList = data.districts;
        this.wardList = []
      }
    )
  }

  getWard(code: any) {
    this.locationService.getWardByDistrict(code).subscribe(
      (data: any) => this.wardList = data.wards
    )
  }

  openDialogChooseFile() {
    this.dialog.open(ImportFromFileDialogComponent);
  }
}
