import { nonNullable } from 'src/utils/nonNullable';
import { Creature } from './Creature';
import { Point } from './Game';
import { Life } from './Life';

export class CreatureMap {
  private pointCreatureMap: Map<string, Creature> = new Map();
  private creaturePointMap: WeakMap<Creature, Point> = new Map();

  constructor(private life: Life) {}

  hasAliveCreatureAt(point: Point): boolean {
    const creature = this.pointCreatureMap.get(point.serialize());
    return !!creature && this.life.has(creature);
  }

  getAlivePoints(): Point[] {
    return this.life
      .getCreatures()
      .map((creature) => this.getPointOf(creature))
      .filter(nonNullable)
      .sort((a, b) => a.compare(b));
  }

  private getPointOf(creature: Creature): Point | undefined {
    return this.creaturePointMap.get(creature);
  }

  place(point: Point, creature: Creature): void {
    this.pointCreatureMap.set(point.serialize(), creature);
    this.creaturePointMap.set(creature, point);
  }

  clearDeathCreaturePoints(): void {
    this.pointCreatureMap.clear();
    this.life.getCreatures().forEach((creature) => {
      const point = this.getPointOf(creature);
      if (point) {
        this.pointCreatureMap.set(point.serialize(), creature);
      }
    });
  }
}
