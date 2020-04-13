import { Point } from './Game';

export class PointMap<T> {
  private cache: Map<string, T> = new Map();

  get(point: Point): T | undefined {
    return this.cache.get(this.getKey(point));
  }

  private getKey(point: Point): string {
    return Object.entries(point)
      .map((entry) => entry.join(':'))
      .join(';');
  }

  set(point: Point, value: T): void {
    this.cache.set(this.getKey(point), value);
  }

  clear(): void {
    this.cache.clear();
  }
}
