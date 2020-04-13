import { Creature } from './Creature';
import { CreatureMap } from './CreatureMap';
import { Point } from './Game';
import { LivingCreature, LivingCreatureOvule } from './LivingCreature';
import { ThreeParentOvule } from './ThreeParentOvule';

export class LivingCreatureFactory {
  private ovuleMap = new Map<string, LivingCreatureOvule>();

  constructor(private creatureMap: CreatureMap) {}

  create(point: Point): Creature {
    const creature = this.createCreature(point);
    this.creatureMap.place(point, creature);
    return creature;
  }

  reset(): void {
    this.ovuleMap.clear();
  }

  private createCreature(point: Point): Creature {
    return new LivingCreature(
      {
        getAliveNeighborsCount: () =>
          point.getPointsAround().filter((p) => this.creatureMap.hasAliveCreatureAt(p)).length,
      },
      {
        getAvailableOvules: () =>
          point
            .getPointsAround()
            .filter((p) => !this.creatureMap.hasAliveCreatureAt(p))
            .map((p) => this.getOvuleOrCreateAt(p)),
      },
    );
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
}
