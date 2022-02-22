import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'humanaged';

  constructor(private dialog: MatDialog) {}

  // async openDialog(dialogName: string): Promise<MatDialogRef<any>> {
  //   const chunk = await import(
  //     `./components/dialogs/${dialogName}/${dialogName}.component`
  //   );
  //   console.log(chunk);
  //   const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
  //   console.log(dialogComponent);
    
  //   return this.dialog.open(dialogComponent, {height: "668px", width:"1125px"});
  // }
}
