import { Board } from './Board';
import { Creature } from './Creature';
import { Life } from './Life';
import { LivingCreature, LivingCreatureOvule } from './LivingCreature';
import { ThreeParentOvule } from './ThreeParentOvule';

export interface Point {
  x: number;
  y: number;
}

export class Game {
  private board = new Board(10, 10);
  private life = new Life();
  private ovuleMap = new PointMap<LivingCreatureOvule>();

  fill({ x, y }: Point): void {
    const creature = this.createCreature({ x, y });
    this.life.addCreature(creature);
    this.board.fillCell({ x, y, creature });
  }

  private createCreature({ x, y }: Point): Creature {
    return new LivingCreature(
      {
        getAliveNeighborsCount: () => this.getAliveNeighborsCount({ x, y }),
      },
      {
        getAvailableOvules: () => this.getOvules({ x, y }),
      },
    );
  }

  private getOvules({ x, y }: Point): LivingCreatureOvule[] {
    return this.getPointAround({ x, y })
      .filter((point) => !this.isAlivePoint(point))
      .map((point) => this.getOvuleOrCreate(point));
  }

  private getOvuleOrCreate(point: Point): LivingCreatureOvule {
    if (!this.ovuleMap.get(point)) {
      this.ovuleMap.set(
        point,
        new ThreeParentOvule({
          create: () => {
            const creature = this.createCreature({ x: point.x, y: point.y });
            this.board.fillCell({ ...point, creature });
            return creature;
          },
        }),
      );
    }
    return this.ovuleMap.get(point) as LivingCreatureOvule;
  }

  getAlivePoints(): Point[] {
    return this.board
      .getCells()
      .flat()
      .filter((cell) => this.isAlivePoint(cell))
      .map(({ x, y }) => ({ x, y }));
  }

  tick(): void {
    this.life.tick();
    this.ovuleMap.clear();
  }

  private getAliveNeighborsCount({ x, y }: Point): number {
    return this.getPointAround({ x, y }).filter((point) => this.isAlivePoint(point)).length;
  }

  private getPointAround({ x, y }: Point): Point[] {
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

  private isAlivePoint({ x, y }: Point): boolean {
    const cell = this.board.getCells()[x]?.[y];
    return !!cell?.creature && this.life.isAlive(cell.creature);
  }
}

class PointMap<T> {
  private cache: Map<string, T> = new Map();

  get(point: Point): T | undefined {
    return this.cache.get(this.getKey(point));
  }

  private getKey(point: Point): string {
    return `x:${point.x};y:${point.y}`;
  }

  set(point: Point, value: T): void {
    this.cache.set(this.getKey(point), value);
  }

  clear(): void {
    this.cache.clear();
  }
}
