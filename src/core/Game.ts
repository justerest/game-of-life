import { nonNullable } from 'src/utils/nonNullable';
import { Creature } from './Creature';
import { CreatureMap } from './CreatureMap';
import { Life } from './Life';
import { LivingCreature, LivingCreatureOvule } from './LivingCreature';
import { PointMap } from './PointMap';
import { ThreeParentOvule } from './ThreeParentOvule';

export interface Point {
  x: number;
  y: number;
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
      {
        getAliveNeighborsCount: () => this.getAliveNeighborsCount(point),
      },
      {
        getAvailableOvules: () => this.getOvules(point),
      },
    );
  }

  private getAliveNeighborsCount(point: Point): number {
    return this.getPointsAround(point).filter((p) => this.isAliveCreatureAt(p)).length;
  }

  private getPointsAround({ x, y }: Point): Point[] {
    return [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ].map((coordinates) => ({ x: coordinates[0], y: coordinates[1] }));
  }

  private isAliveCreatureAt(point: Point): boolean {
    const creature = this.creatureMap.getCreatureAt(point);
    if (!creature) return false;
    return this.life.isAlive(creature);
  }

  private getOvules(point: Point): LivingCreatureOvule[] {
    return this.getPointsAround(point)
      .filter((p) => !this.isAliveCreatureAt(p))
      .map((p) => this.getOvuleOrCreate(p));
  }

  private getOvuleOrCreate(point: Point): LivingCreatureOvule {
    if (!this.ovuleMap.get(point)) {
      this.ovuleMap.set(
        point,
        new ThreeParentOvule({
          create: () => {
            const creature = this.createCreature(point);
            this.creatureMap.set(point, creature);
            return creature;
          },
        }),
      );
    }
    return this.ovuleMap.get(point) as LivingCreatureOvule;
  }

  getAlivePoints(): Point[] {
    return this.life
      .getAliveCreatures()
      .map((creature) => this.creatureMap.getPointOf(creature))
      .filter(nonNullable)
      .sort((a, b) => a.x - b.x || a.y - b.y);
  }

  tick(): void {
    this.life.tick();
    this.ovuleMap.clear();
    this.creatureMap.removeAllOmit(this.life.getAliveCreatures());
  }
}
