import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-import-error-dialog',
  templateUrl: './import-error-dialog.component.html',
  styleUrls: ['./import-error-dialog.component.css']
})
export class ImportErrorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public duplicationList: Map<string, string>
  ) {
  }

  ngOnInit(): void {
  }

}
