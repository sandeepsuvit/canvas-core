import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkbenchCanvasRoutingModule } from './workbench-canvas-routing.module';
import { WorkbenchCanvasComponent } from './workbench-canvas.component';
import { CanvasService } from './services/canvas.service';

@NgModule({
  declarations: [WorkbenchCanvasComponent],
  imports: [
    CommonModule,
    WorkbenchCanvasRoutingModule
  ],
  providers: [
    CanvasService
  ]
})
export class WorkbenchCanvasModule { }
