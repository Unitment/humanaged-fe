import { Project } from './../../../model/project/Project';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
})
export class ProjectTableComponent implements OnInit, AfterViewInit {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.dataSource = new MatTableDataSource(this.projects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.log(error),
      () => {}
    );
  }

  projects: Array<Project> = [];
  displayedColumns: string[] = [
    // 'select',
    'id',
    'name',
    'startDate',
    'endDate',
    'state',
    'action',
  ];
  dataSource!: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selection = new SelectionModel<Project>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id ? +row.id + 1 : 0
    }`;
  }

  onEditClick(id: string) {
    this.router.navigate(['/project/edit', id]);
  }

  onDeleteClick(row: Project) {
    // event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        name: row.name,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.name === row.name) {
        this.projectService.deleteProject(row).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            this.openSnackBar(error.error.message, 'OK');
            console.log(error);
          },
          () => {
            this.projects = this.projects.filter(
              (project) => project.id !== row.id
            );
            this.dataSource.data = this.projects;
          }
        );
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openProjectDetailDialog(id: string){
    this.dialogService.openProjectDetailDialog(id);
  }
}
