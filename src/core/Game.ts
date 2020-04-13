import { CreatureMap } from './CreatureMap';
import { Life } from './Life';
import { LivingCreatureFactory } from './LivingCreatureFactory';

export interface Point {
  getPointsAround(): Point[];
  compare(point: Point): number;
  serialize(): string;
}

export class Game {
  private life = new Life();
  private creatureMap = new CreatureMap(this.life);
  private livingCreatureFactory = new LivingCreatureFactory(this.creatureMap);

  fill(point: Point): void {
    const creature = this.livingCreatureFactory.create(point);
    this.life.addCreature(creature);
  }

  getAlivePoints(): Point[] {
    return this.creatureMap.getAlivePoints();
  }

  tick(): void {
    this.life.tick();
    this.livingCreatureFactory.reset();
    this.creatureMap.clearDeathCreaturePoints();
  }
}
