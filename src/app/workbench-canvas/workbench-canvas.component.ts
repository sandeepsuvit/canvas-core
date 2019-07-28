import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CanvasService } from './services/canvas.service';

@Component({
  selector: 'app-workbench-canvas',
  templateUrl: './workbench-canvas.component.html',
  styleUrls: ['./workbench-canvas.component.scss']
})
export class WorkbenchCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('board', { read: ViewContainerRef }) board: ViewContainerRef;

  // setting a width and height for the canvas
  @Input() public width = window.innerWidth;
  @Input() public height = window.innerHeight;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._initCanvas();
  }

  /**
   * Initialize the canvas properties
   *
   * @private
   * @memberof WorkbenchComponent
   */
  private _initCanvas() {
    // get the context
    this.canvas = this.board.element.nativeElement;
    this.context = this.canvas.getContext('2d');

    // Resize the screen on first load
    this.onResize(this.canvas);

    // Register mouse click events
    this.canvasService.handleClickEvents(this.canvas);
    // Register touch events
    this.canvasService.handleTouchEvents(this.canvas);
    // Register zoom events
    this.canvasService.handleZoomEvents(this.canvas);
  }

  /**
   * Set width and height
   *
   * @param {HTMLCanvasElement} canvas
   * @memberof WorkbenchComponent
   */
  onResize(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

}
