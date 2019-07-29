import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { SvgService } from './services/svg.service';
import { ShapeType } from './models/shape-type';
import { ShapesService } from './services/shapes.service';

@Component({
  selector: 'app-workbench-svg',
  templateUrl: './workbench-svg.component.html',
  styleUrls: ['./workbench-svg.component.scss']
})
export class WorkbenchSvgComponent implements OnInit, AfterViewInit {
  @ViewChild('svg', { read: ViewContainerRef }) svgRef: ViewContainerRef;

  private svg: SVGElement;
  selectedShape: ShapeType;

  constructor(
    private svgService: SvgService,
    private shapeService: ShapesService,
  ) { }

  ngOnInit() {
    // Set selected shape as path by default
    this.selectedShape = ShapeType.Path;
  }

  ngAfterViewInit() {
    this._initSvg();
  }

  /**
   * Initialize the svg
   *
   * @private
   * @memberof WorkbenchSvgComponent
   */
  private _initSvg() {
    this.svg = this.svgRef.element.nativeElement;

    // Resize the screen on first load
    this.onResize(this.svg);

    // Register click events
    // this.svgService.handleClickEvents(this.svg);
    // Reigster touch events
    // this.svgService.handleTouchEvents(this.svg);
  }

  /**
   * Handle svg element width and height
   *
   * @param {SVGElement} svgEl
   * @memberof WorkbenchSvgComponent
   */
  onResize(svgEl: SVGElement) {
    svgEl.setAttribute('height', `${window.innerHeight}px`);
    svgEl.setAttribute('width', `${window.innerWidth}px`);
  }

  /**
   * Select a shape to draw
   *
   * @param {string} shapeType
   * @memberof WorkbenchSvgComponent
   */
  selectShape(shapeType: string) {
    this.selectShape = ShapeType[shapeType];
    console.log('selected shape:', this.selectedShape);
  }

  /**
   * Get all shapes that are drawn on the base svg
   *
   * @memberof WorkbenchSvgComponent
   */
  getShapes() {
    this.shapeService.getShapeComponents();
  }
}
