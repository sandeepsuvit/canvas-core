import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CanvasService } from './service/canvas.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit, AfterViewInit {
  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;
  
  // setting a width and height for the canvas
  @Input() public width = window.innerWidth;
  @Input() public height = window.innerHeight;

  private canvasCtx: CanvasRenderingContext2D;

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
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.canvasCtx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.canvasCtx.lineWidth = 3;
    this.canvasCtx.lineCap = 'round';
    this.canvasCtx.strokeStyle = '#000';
    
    // Register mouse click events
    this.canvasService.handleClickEvents(canvasEl);
    // Register touch events
    this.canvasService.handleTouchEvents(canvasEl);
  }
}
