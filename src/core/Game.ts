import { nonNullable } from 'src/utils/nonNullable';
import { Creature } from './Creature';
import { CreatureMap } from './CreatureMap';
import { Life } from './Life';
import { LivingCreature, LivingCreatureOvule } from './LivingCreature';
import { PointMap } from './PointMap';
import { ThreeParentOvule } from './ThreeParentOvule';

export interface Point {
  getPointsAround(): Point[];
  compare(point: Point): number;
}

export class Game {
  private life = new Life();
  private ovuleMap = new PointMap<LivingCreatureOvule>();
  private creatureMap = new CreatureMap();

  fill(point: Point): void {
    const creature = this.createCreature(point);
    this.life.addCreature(creature);
    this.creatureMap.set(point, creature);
  }

  private createCreature(point: Point): Creature {
    return new LivingCreature(
      { getAliveNeighborsCount: () => this.getAliveNeighborsCount(point) },
      { getAvailableOvules: () => this.getOvules(point) },
    );
  }

  private getAliveNeighborsCount(point: Point): number {
    return point.getPointsAround().filter((p) => this.isAliveCreatureAt(p)).length;
  }

  private isAliveCreatureAt(point: Point): boolean {
    const creature = this.creatureMap.getCreatureAt(point);
    if (creature) {
      return this.life.has(creature);
    }
    return false;
  }

  private getOvules(point: Point): LivingCreatureOvule[] {
    return point
      .getPointsAround()
      .filter((p) => !this.isAliveCreatureAt(p))
      .map((p) => this.getOvuleOrCreate(p));
  }

  private getOvuleOrCreate(point: Point): LivingCreatureOvule {
    if (!this.ovuleMap.get(point)) {
      this.ovuleMap.set(point, this.createOvule(point));
    }
    return this.ovuleMap.get(point) as LivingCreatureOvule;
  }

  private createOvule(point: Point): LivingCreatureOvule {
    return new ThreeParentOvule({
      create: () => {
        const creature = this.createCreature(point);
        this.creatureMap.set(point, creature);
        return creature;
      },
    });
  }

  getAlivePoints(): Point[] {
    return this.life
      .getCreatures()
      .map((creature) => this.creatureMap.getPointOf(creature))
      .filter(nonNullable)
      .sort((a, b) => a.compare(b));
  }

  tick(): void {
    this.life.tick();
    this.ovuleMap.clear();
    this.creatureMap.reset(this.life.getCreatures());
  }
}
