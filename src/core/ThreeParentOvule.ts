import { Creature } from './Creature';
import { LivingCreatureOvule } from './LivingCreature';

interface CreatureFactory {
  create(): Creature;
}

export class ThreeParentOvule implements LivingCreatureOvule {
  private parents: Set<Creature> = new Set();

  constructor(private factory: CreatureFactory) {}

  handleBy(creature: Creature): void {
    this.parents.add(creature);
  }

  getCreature(): Creature | undefined {
    const parentsCount = this.parents.size;
    this.parents.clear();
    return parentsCount === 3 ? this.factory.create() : undefined;
  }
}
