import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchComponent } from './workbench.component';
import { CanvasService } from './service/canvas.service';

@NgModule({
  declarations: [WorkbenchComponent],
  imports: [
    CommonModule,
    WorkbenchRoutingModule
  ],
  providers: [
    CanvasService
  ]
})
export class WorkbenchModule { }
