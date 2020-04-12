import { Creature, Ovule } from './Creature';

export class Life {
  private aliveCreatures: Set<Creature> = new Set();

  constructor() {}

  getAliveCreaturesCount(): number {
    return this.aliveCreatures.size;
  }

  addCreature(creature: Creature): void {
    this.aliveCreatures.add(creature);
  }

  tick(): void {
    const deathCreatures = this.getDeathCreatures();
    this.getNewCreatures().forEach((creature) => this.aliveCreatures.add(creature));
    deathCreatures.forEach((creature) => this.aliveCreatures.delete(creature));
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
    return this.getCreatures().filter((creature) => creature.isReadyToDie());
  }

  private getCreatures(): Creature[] {
    return [...this.aliveCreatures.values()];
  }
}

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
