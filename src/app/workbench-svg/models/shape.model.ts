import { MousePosition } from './mouse-position.model';
import { ShapeType, State } from './shape-type';

/**
 * Shape properties class
 *
 * @export
 * @class ShapeProperties
 */
export class ShapeProperties {
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    fill: boolean;
    stroke: boolean;
    shapeType: ShapeType;
    name: string;
    visible: boolean;

    constructor() {
        this.fill = true;
        this.fillColor = '#e7e7e7';
        this.stroke = true;
        this.strokeColor = 'black';
        this.strokeWidth = 1;
        this.name = 'unknown';
        this.visible = true;
    }
}

/**
 * Base shape interface
 *
 * @export
 * @interface BaseShape
 */
export interface BaseShape {}


/**
 * Base shape class
 *
 * @export
 * @class Shape
 * @implements {BaseShape}
 */
export class Shape implements BaseShape {
    public properties: ShapeProperties;
    public originX: number;
    public originY: number;

    constructor(name: string) {
        this.properties = new ShapeProperties();
        this.originX = this.originY = 0;
        this.properties.name = name;
        console.log('Shape constructor: ', this.properties);
    }
}

/**
 * Line shape
 *
 * @export
 * @class Line
 * @extends {Shape}
 */
export class Line extends Shape {
    private static id = 0;
    public x2: number;
    public y2: number;

    constructor() {
        super(`line-${Line.id++}`);
        this.x2 = this.y2 = 0;
        console.log('Line constructor: ', this);
    }
}

/**
 * Circle shape
 *
 * @export
 * @class Circle
 * @extends {Shape}
 */
export class Circle extends Shape {
    private static id = 0;
    public r: number;

    constructor() {
        super(`circle-${Circle.id++}`);
        this.r = 0;
        console.log('Circle constructor: ', this);
    }
}

/**
 * Rectangle shape
 *
 * @export
 * @class Rectangle
 * @extends {Shape}
 */
export class Rectangle extends Shape {
    private static id = 0;
    public width: number;
    public height: number;

    constructor() {
        super(`rectangle-${Rectangle.id++}`);
        this.width = this.height = 0;
        console.log('Rectangle constructor: ', this);
    }
}

/**
 * Square shape
 *
 * @export
 * @class Square
 * @extends {Shape}
 */
export class Square extends Shape {
    private static id = 0;
    public width: number;

    constructor() {
        super(`square-${Square.id++}`);
        this.width = 0;
        console.log('Rectangle constructor: ', this);
    }
}

/**
 * Ellipse shape
 *
 * @export
 * @class Ellipse
 * @extends {Shape}
 */
export class Ellipse extends Shape {
    private static id = 0;
    public rx: number;
    public ry: number;

    constructor() {
        super(`ellipse-${Ellipse.id++}`);
        this.rx = this.ry = 0;
        console.log('Ellipse constructor: ', this);
    }
}

/**
 * Text shape
 *
 * @export
 * @class TextBox
 * @extends {Shape}
 */
export class TextBox extends Shape {
    private static id = 0;

    public value: string;

    constructor() {
        super(`text-${TextBox.id++}`);
        this.value = 'Example text';
        console.log('Text constructor: ', this);
    }
}

/**
 * Polyline shape
 *
 * @export
 * @class PolyLine
 * @extends {Shape}
 */
export class PolyLine extends Shape {
    private static id = 0;
    public points: MousePosition[];

    constructor() {
        super(`polyline-${PolyLine.id++}`);
        this.points = [];
        console.log('PolyLine constructor ', this);
    }
}

/**
 * Path shape
 *
 * @export
 * @class Path
 * @extends {Shape}
 */
export class Path extends Shape {
    private static id = 0;
    public points: MousePosition[];
    public state: State;

    constructor() {
        super(`path-${Path.id++}`);
        this.points = [];
        this.state = State.None;
        console.log('Path constructor: ', this);
    }
}
