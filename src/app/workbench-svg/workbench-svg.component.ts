import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { SvgService } from './services/svg.service';

@Component({
  selector: 'app-workbench-svg',
  templateUrl: './workbench-svg.component.html',
  styleUrls: ['./workbench-svg.component.scss']
})
export class WorkbenchSvgComponent implements OnInit, AfterViewInit {
  @ViewChild('svg', { read: ViewContainerRef }) svgRef: ViewContainerRef;

  private svg: SVGElement;

  constructor(
    private svgService: SvgService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._initSvg();
  }

  private _initSvg() {
    this.svg = this.svgRef.element.nativeElement;

    // Register click events
    this.svgService.handleClickEvents(this.svg);
    // Reigster touch events
    this.svgService.handleTouchEvents(this.svg);
  }
}
