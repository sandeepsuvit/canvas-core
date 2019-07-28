import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkbenchSvgRoutingModule } from './workbench-svg-routing.module';
import { WorkbenchSvgComponent } from './workbench-svg.component';
import { SvgService } from './services/svg.service';

@NgModule({
  declarations: [WorkbenchSvgComponent],
  imports: [
    CommonModule,
    WorkbenchSvgRoutingModule
  ],
  providers: [
    SvgService
  ]
})
export class WorkbenchSvgModule { }
