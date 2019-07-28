import { Injectable } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { MousePosition } from '../interfaces/mouse-position.interface';

@Injectable()
export class CanvasService {

  constructor() { }
  
  /**
   * Capture mouse events
   *
   * @private
   * @param {HTMLCanvasElement} canvasEl
   * @memberof WorkbenchComponent
   */
  handleClickEvents(canvasEl: HTMLCanvasElement) {
    // Get the canvas context
    const canvasCtx = canvasEl.getContext('2d');

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

        // Triggger draw event
        this._drawOnCanvas(prevPos, currentPos, canvasCtx);
      });
  }

   /**
   * Capture touch events
   * 
   * Note:-
   * https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
   *
   * @private
   * @param {HTMLCanvasElement} canvasEl
   * @memberof WorkbenchComponent
   */
  handleTouchEvents(canvasEl: HTMLCanvasElement) {
    // Get the canvas context
    const canvasCtx = canvasEl.getContext('2d');

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
        x: res[0].changedTouches[0].clientX - rect.left,
        y: res[0].changedTouches[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].changedTouches[0].clientX - rect.left,
        y: res[1].changedTouches[0].clientY - rect.top
      };
      
      // Triggger draw event
      this._drawOnCanvas(prevPos, currentPos, canvasCtx);
    });
  }

  /**
   * Capture zoom events
   *
   * @param {HTMLCanvasElement} canvasEl
   * @memberof CanvasService
   */
  handleZoomEvents(canvasEl: HTMLCanvasElement) {
    // Get the canvas context
    const canvasCtx = canvasEl.getContext('2d');

    fromEvent(canvasEl, 'mousewheel')
    .pipe(switchMap((e) => of(e)))
    .subscribe((e: WheelEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // Handle zoom
      this._zoomOnCanvas(position, e.deltaY < 0, canvasCtx);
    });
  }

  /**
   * Draw events on the canvas
   *
   * @param {MousePosition} prevPos
   * @param {MousePosition} currentPos
   * @param {CanvasRenderingContext2D} canvasCtx
   * @returns
   * @memberof CanvasService
   */
  private _drawOnCanvas(prevPos: MousePosition, currentPos: MousePosition, canvasCtx: CanvasRenderingContext2D) {
    // incase the context is not set
    if (!canvasCtx) { return; }

    // set some default properties about the line
    canvasCtx.lineWidth = 3;
    canvasCtx.lineCap = 'round';
    canvasCtx.strokeStyle = '#000';
    
    // start our drawing path
    canvasCtx.beginPath();
  
    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      canvasCtx.moveTo(prevPos.x, prevPos.y); // from
  
      // draws a line from the start pos until the current position
      canvasCtx.lineTo(currentPos.x, currentPos.y);
  
      // strokes the current path with the styles we set earlier
      canvasCtx.stroke();
    }
  }

  /**
   * Zoom events on the canvas
   *
   * @private
   * @param {MousePosition} position
   * @param {boolean} isZoomIn
   * @param {CanvasRenderingContext2D} canvasCtx
   * @memberof CanvasService
   */
  private _zoomOnCanvas(position: MousePosition, isZoomIn: boolean, canvasCtx: CanvasRenderingContext2D) {
    // incase the context is not set
    if (!canvasCtx) { return; }
    
    if (isZoomIn) {
      console.log('Zoom in', position);
    } else {
      console.log('Zoom out', position);
    }
  }
}
