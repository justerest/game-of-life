import { Point } from './Game';
export class Point2D implements Point {
  x: number;
  y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  getPointsAround(): Point[] {
    return [
      [this.x - 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y - 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y],
      [this.x + 1, this.y + 1],
    ].map(([x, y]) => new Point2D({ x, y }));
  }

  compare(point: Point2D): number {
    return this.x - point.x || this.y - point.y;
  }
}
