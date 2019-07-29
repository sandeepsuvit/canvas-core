import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { MousePosition } from '../models/mouse-position.model';

@Injectable()
export class SvgService {

  constructor() { }

  /**
   * Capture click events
   *
   * @param {SVGElement} svgEl
   * @memberof SvgService
   */
  handleClickEvents(svgEl: SVGElement) {
    fromEvent(svgEl, 'mousedown')
    .pipe(
      switchMap((e) => {
        return fromEvent(svgEl, 'mousemove')
        .pipe(
          takeUntil(fromEvent(svgEl, 'mouseup')),
          takeUntil(fromEvent(svgEl, 'mouseleave')),
          pairwise()
        );
      })
    ).subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = svgEl.getBoundingClientRect();

      // previous and current position with the offset
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };

      // Handle draw event
      this._drawOnSvg(prevPos, currentPos);
    });
  }

  /**
   * Capture touch events
   *
   * @param {HTMLCanvasElement} svgEl
   * @memberof SvgService
   */
  handleTouchEvents(svgEl: SVGElement) {
    fromEvent(svgEl, 'touchstart')
      .pipe(
        switchMap((e) => {
          return fromEvent(svgEl, 'touchmove')
            .pipe(
              takeUntil(fromEvent(svgEl, 'touchend')),
              takeUntil(fromEvent(svgEl, 'touchcancel')),
              pairwise()
            );
        })
      )
      .subscribe((res: [TouchEvent, TouchEvent]) => {
        console.log(res);
        const rect = svgEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].changedTouches[0].clientX - rect.left,
          y: res[0].changedTouches[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].changedTouches[0].clientX - rect.left,
          y: res[1].changedTouches[0].clientY - rect.top
        };

        // Handle draw event
        this._drawOnSvg(prevPos, currentPos);
      });
  }

  /**
   * Draw on svg
   *
   * @private
   * @param {MousePosition} prevPos
   * @param {MousePosition} currentPos
   * @memberof SvgService
   */
  private _drawOnSvg(prevPos: MousePosition, currentPos: MousePosition) {
    console.log(prevPos);
    console.log(currentPos);
  }
}
