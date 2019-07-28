import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbenchCanvasComponent } from './workbench-canvas.component';

describe('WorkbenchCanvasComponent', () => {
  let component: WorkbenchCanvasComponent;
  let fixture: ComponentFixture<WorkbenchCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbenchCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbenchCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
