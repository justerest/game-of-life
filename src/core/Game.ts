import { nonNullable } from 'src/utils/nonNullable';
import { Creature } from './Creature';
import { CreatureMap } from './CreatureMap';
import { Life } from './Life';
import { LivingCreature, LivingCreatureOvule } from './LivingCreature';
import { ThreeParentOvule } from './ThreeParentOvule';

export interface Point {
  getPointsAround(): Point[];
  compare(point: Point): number;
  serialize(): string;
}

export class Game {
  private life = new Life();
  private ovuleMap = new Map<string, LivingCreatureOvule>();
  private creatureMap = new CreatureMap(this.life);

  fill(point: Point): void {
    const creature = this.createCreature(point);
    this.life.addCreature(creature);
    this.creatureMap.place(point, creature);
  }

  private createCreature(point: Point): Creature {
    return new LivingCreature(
      { getAliveNeighborsCount: () => this.getAliveNeighborsCount(point) },
      { getAvailableOvules: () => this.getOvulesAround(point) },
    );
  }

  private getAliveNeighborsCount(point: Point): number {
    return point.getPointsAround().filter((p) => this.isAliveCreatureAt(p)).length;
  }

  private isAliveCreatureAt(point: Point): boolean {
    return this.creatureMap.hasAliveCreatureAt(point);
  }

  private getOvulesAround(point: Point): LivingCreatureOvule[] {
    return point
      .getPointsAround()
      .filter((p) => !this.isAliveCreatureAt(p))
      .map((p) => this.getOvuleOrCreateAt(p));
  }

  private getOvuleOrCreateAt(point: Point): LivingCreatureOvule {
    if (!this.ovuleMap.get(point.serialize())) {
      this.ovuleMap.set(point.serialize(), this.createOvule(point));
    }
    return this.ovuleMap.get(point.serialize()) as LivingCreatureOvule;
  }

  private createOvule(point: Point): LivingCreatureOvule {
    return new ThreeParentOvule({
      create: () => {
        const creature = this.createCreature(point);
        this.creatureMap.place(point, creature);
        return creature;
      },
    });
  }

  getAlivePoints(): Point[] {
    return this.creatureMap.getAlivePoints();
  }

  tick(): void {
    this.life.tick();
    this.ovuleMap.clear();
    this.creatureMap.clearDeathCreaturePoints();
  }
}
