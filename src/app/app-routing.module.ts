import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'canvas', loadChildren: './workbench-canvas/workbench-canvas.module#WorkbenchCanvasModule' },
  { path: 'svg', loadChildren: './workbench-svg/workbench-svg.module#WorkbenchSvgModule' },
  { path: '', redirectTo: 'canvas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
