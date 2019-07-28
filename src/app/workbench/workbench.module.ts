import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchComponent } from './workbench.component';

@NgModule({
  declarations: [WorkbenchComponent],
  imports: [
    CommonModule,
    WorkbenchRoutingModule
  ]
})
export class WorkbenchModule { }
