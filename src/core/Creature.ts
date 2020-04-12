export interface Creature {
  isReadyToDie(): boolean;
  getOvules(): Ovule[];
}

export interface Ovule {
  getCreature(): Creature | undefined;
}
