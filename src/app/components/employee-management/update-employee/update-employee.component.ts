import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../services/employee.service";
import {LocationService} from "../../../services/location.service";
import {Employee} from "../../../model/employee/Employee";
import {Location} from "@angular/common";


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

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private route:Router) {
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
      }
    )

    this.locationService.getAllProvince().subscribe(
      data => this.provinceList = data
    )

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
          status: data.status
        });
      }
    )
  }

  saveEmployee() {
    if (this.form.valid) {
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

  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
