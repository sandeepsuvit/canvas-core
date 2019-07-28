import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkbenchSvgRoutingModule } from './workbench-svg-routing.module';
import { WorkbenchSvgComponent } from './workbench-svg.component';

@NgModule({
  declarations: [WorkbenchSvgComponent],
  imports: [
    CommonModule,
    WorkbenchSvgRoutingModule
  ]
})
export class WorkbenchSvgModule { }
