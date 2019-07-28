import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkbenchSvgComponent } from './workbench-svg.component';

const routes: Routes = [{
  path: '',
  component: WorkbenchSvgComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkbenchSvgRoutingModule { }
