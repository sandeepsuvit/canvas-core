import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkbenchCanvasComponent } from './workbench-canvas.component';

const routes: Routes = [{
  path: '',
  component: WorkbenchCanvasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkbenchCanvasRoutingModule { }
