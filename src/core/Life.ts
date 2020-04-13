import { nonNullable } from '../utils/nonNullable';
import { Creature, Ovule } from './Creature';

export class Life {
  private aliveCreatures: Set<Creature> = new Set();

  constructor() {}

  getCreatures(): Creature[] {
    return [...this.aliveCreatures.values()];
  }

  getCreaturesCount(): number {
    return this.aliveCreatures.size;
  }

  has(creature: Creature): boolean {
    return this.aliveCreatures.has(creature);
  }

  addCreature(creature: Creature): void {
    this.aliveCreatures.add(creature);
  }

  tick(): void {
    const newCreatureList = this.getNewCreatures();
    const deathCreatureList = this.getDeathCreatures();
    newCreatureList.forEach((creature) => this.aliveCreatures.add(creature));
    deathCreatureList.forEach((creature) => this.aliveCreatures.delete(creature));
  }

  private getNewCreatures(): Creature[] {
    return this.getOvules()
      .map((ovule) => ovule.getCreature())
      .filter(nonNullable);
  }

  private getOvules(): Ovule[] {
    return this.getCreatures().flatMap((creature) => creature.getOvules?.() ?? []);
  }

  private getDeathCreatures(): Creature[] {
    return this.getCreatures().filter((creature) => creature.isReadyToDie?.() ?? true);
  }
}
