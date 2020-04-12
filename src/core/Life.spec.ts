import { Creature } from './Creature';
import { Life } from './Life';

describe('Life', () => {
  let life: Life;

  beforeEach(() => {
    life = new Life();
  });

  it('+addCreature() should add creature to life', () => {
    expect(life.getAliveCreaturesCount()).toBe(0);
    life.addCreature({} as Creature);
    expect(life.getAliveCreaturesCount()).toBe(1);
  });

  it('+tick() should kill creatures that ready to die', () => {
    life.addCreature({ isReadyToDie: () => true } as Creature);
    life.tick();
    expect(life.getAliveCreaturesCount()).toBe(0);
  });

  it('+tick() should not kill creatures that not ready to die', () => {
    life.addCreature({ isReadyToDie: () => false } as Creature);
    life.tick();
    expect(life.getAliveCreaturesCount()).toBe(1);
  });

  it('+tick() should add creatures from ovules', () => {
    life.addCreature({
      isReadyToDie: () => false,
      getOvules: () => [{ getCreature: () => ({}) }],
    } as Creature);
    life.tick();
    expect(life.getAliveCreaturesCount()).toBe(2);
  });
});
