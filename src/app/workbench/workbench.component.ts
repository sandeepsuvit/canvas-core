import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { MousePosition } from './interfaces/mouse-position.interface';

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

  private cx: CanvasRenderingContext2D;

  constructor() { }

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
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    
    // Register mouse click events
    this._captureClickEvents(canvasEl);
    // Register touch events
    this._captureTouchEvents(canvasEl);
  }

  /**
   * Capture mouse events
   *
   * @private
   * @param {HTMLCanvasElement} canvasEl
   * @memberof WorkbenchComponent
   */
  private _captureClickEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
  
        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
  
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
  
        this._drawOnCanvas(prevPos, currentPos);
      });
  }

   /**
   * Capture touch events
   *
   * @private
   * @param {HTMLCanvasElement} canvasEl
   * @memberof WorkbenchComponent
   */
  private _captureTouchEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all touch events from the canvas element
    fromEvent(canvasEl, 'touchstart')
    .pipe(
      switchMap((e) => {
        // after a touch, we'll record all moves
        return fromEvent(canvasEl, 'touchmove')
        .pipe(
          // we'll stop (and unsubscribe) once the user releases touch
          // this will trigger a 'touchend' event
          takeUntil(fromEvent(canvasEl, 'touchend')),
          // we'll also stop (and unsubscribe) once the touch leaves the canvas (touchcancel event)
          takeUntil(fromEvent(canvasEl, 'touchcancel')),
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          pairwise()
        )
      })
    )
    .subscribe((res: [TouchEvent, TouchEvent]) => {
      const rect = canvasEl.getBoundingClientRect();

      // previous and current position with the offset
      const prevPos = {
        x: res[0].touches[0].clientX - rect.left,
        y: res[0].touches[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].touches[0].clientX - rect.left,
        y: res[1].touches[0].clientY - rect.top
      };

      this._drawOnCanvas(prevPos, currentPos);
    });
  }

  /**
   * Draw events on the canvas
   *
   * @private
   * @param MousePosition prevPos
   * @param MousePosition currentPos
   * @returns
   * @memberof WorkbenchComponent
   */
  private _drawOnCanvas(prevPos: MousePosition, currentPos: MousePosition) {
    // incase the context is not set
    if (!this.cx) { return; }
  
    // start our drawing path
    this.cx.beginPath();
  
    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
  
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);
  
      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
}
