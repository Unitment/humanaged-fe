import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportFromFileDialogComponent} from './import-from-file-dialog.component';

describe('ImportFromFileDialogComponent', () => {
  let component: ImportFromFileDialogComponent;
  let fixture: ComponentFixture<ImportFromFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportFromFileDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFromFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
