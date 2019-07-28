import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';

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
      console.log(res);
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
      });
  }
}
