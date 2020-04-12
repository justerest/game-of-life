import { nonNullable } from '../utils/nonNullable';
import { Creature, Ovule } from './Creature';

export class Life {
  private aliveCreatures: Set<Creature> = new Set();

  constructor() {}

  getAliveCreatures(): Creature[] {
    return [...this.aliveCreatures.values()];
  }

  getAliveCreaturesCount(): number {
    return this.aliveCreatures.size;
  }

  isAlive(creature: Creature): boolean {
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
    return this.getAliveCreatures().flatMap((creature) => creature.getOvules?.() ?? []);
  }

  private getDeathCreatures(): Creature[] {
    return this.getAliveCreatures().filter((creature) => creature.isReadyToDie?.() ?? true);
  }
}
