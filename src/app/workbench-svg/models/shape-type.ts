/**
 * Available shape types
 *
 * @export
 * @enum {number}
 */
export enum ShapeType {
    NoShape,
    Line,
    Circle,
    Ellipse,
    Rectangle,
    TextBox,
    Path,
    PolyLine,
    Square
}

/**
 * State types
 *
 * @export
 * @enum {number}
 */
export enum State {
    None,
    Moving,
    Finished
}
