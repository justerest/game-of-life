import { Creature } from './Creature';
import { Point } from './Game';

export class CreatureMap {
  private cache: Map<string, Creature> = new Map();
  private weakCache: WeakMap<Creature, Point> = new Map();

  getCreatureAt(point: Point): Creature | undefined {
    return this.cache.get(point.serialize());
  }

  getPointOf(creature: Creature): Point | undefined {
    return this.weakCache.get(creature);
  }

  set(point: Point, creature: Creature): void {
    this.cache.set(point.serialize(), creature);
    this.weakCache.set(creature, point);
  }

  reset(creatures: Creature[]): void {
    this.cache.clear();
    creatures.forEach((creature) => {
      const point = this.getPointOf(creature);
      if (point) {
        this.cache.set(point.serialize(), creature);
      }
    });
  }
}
