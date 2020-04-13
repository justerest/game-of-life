import { Creature } from './Creature';
import { LivingCreatureOvule } from './LivingCreature';

interface CreatureFactory {
  create(): Creature;
}

export class ThreeParentOvule implements LivingCreatureOvule {
  private parents: Set<Creature> = new Set();
  private child: Creature;

  constructor(factory: CreatureFactory) {
    this.child = factory.create();
  }

  handleBy(creature: Creature): void {
    this.parents.add(creature);
  }

  getCreature(): Creature | undefined {
    return this.parents.size === 3 ? this.child : undefined;
  }
}
