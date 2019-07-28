import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbenchSvgComponent } from './workbench-svg.component';

describe('WorkbenchSvgComponent', () => {
  let component: WorkbenchSvgComponent;
  let fixture: ComponentFixture<WorkbenchSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbenchSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbenchSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
