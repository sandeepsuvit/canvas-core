import { Directive, OnInit, OnDestroy, Input, ViewContainerRef } from '@angular/core';
import { ShapesService } from '../services/shapes.service';

@Directive({
    selector: '[dynamic-svg]'
})
export class DynamicSvgDirective implements OnInit, OnDestroy {
    @Input() component: any;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private shapeService: ShapesService
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.viewContainerRef.clear();
    }
}
