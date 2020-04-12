import { Creature, Ovule } from './Creature';

export interface LivingCreatureEyes {
  getAliveNeighborsCount(): number;
}

export interface LivingCreatureLegs {
  getAvailableOvules(): LivingCreatureOvule[];
}

export interface LivingCreatureOvule extends Ovule {
  handleBy(creature: Creature): void;
}

export class LivingCreature implements Creature {
  constructor(private eyes: LivingCreatureEyes, private legs?: LivingCreatureLegs) {}

  isReadyToDie(): boolean {
    const neighborsCount = this.eyes.getAliveNeighborsCount();
    return neighborsCount < 2 || neighborsCount > 3;
  }

  getOvules(): Ovule[] {
    const ovules = this.legs?.getAvailableOvules() ?? [];
    ovules.forEach((ovule) => ovule.handleBy(this));
    return ovules;
  }
}
