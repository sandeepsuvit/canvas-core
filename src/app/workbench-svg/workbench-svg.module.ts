import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkbenchSvgRoutingModule } from './workbench-svg-routing.module';
import { WorkbenchSvgComponent } from './workbench-svg.component';
import { SvgService } from './services/svg.service';
import { ShapesService } from './services/shapes.service';
import { DynamicSvgDirective } from './directives/dynamic-svg.directive';

@NgModule({
  declarations: [
    WorkbenchSvgComponent,
    DynamicSvgDirective
  ],
  imports: [
    CommonModule,
    WorkbenchSvgRoutingModule
  ],
  providers: [
    SvgService,
    ShapesService
  ]
})
export class WorkbenchSvgModule { }
