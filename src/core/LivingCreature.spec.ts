import { LivingCreature } from './LivingCreature';

describe('LivingCreature', () => {
  let creature: LivingCreature;

  beforeEach(() => (creature = new LivingCreature({ getAliveNeighborsCount: () => 3 })));

  it('should be created', () => {
    expect(creature).toBeInstanceOf(LivingCreature);
  });

  it('+isReadyToDie() should returns boolean', () => {
    expect(creature.isReadyToDie() === !!creature.isReadyToDie()).toBeTruthy();
  });

  it('+isReadyToDie() should returns false if 2 alive neighbors', () => {
    creature = new LivingCreature({ getAliveNeighborsCount: () => 2 });
    expect(creature.isReadyToDie()).toBe(false);
  });

  it('+isReadyToDie() should returns false if 3 alive neighbors', () => {
    creature = new LivingCreature({ getAliveNeighborsCount: () => 3 });
    expect(creature.isReadyToDie()).toBe(false);
  });

  it('+isReadyToDie() should returns true if alive neighbors less than 2', () => {
    creature = new LivingCreature({ getAliveNeighborsCount: () => 1 });
    expect(creature.isReadyToDie()).toBe(true);
    creature = new LivingCreature({ getAliveNeighborsCount: () => 0 });
    expect(creature.isReadyToDie()).toBe(true);
  });

  it('+isReadyToDie() should returns true if alive neighbors more than 3', () => {
    creature = new LivingCreature({ getAliveNeighborsCount: () => 4 });
    expect(creature.isReadyToDie()).toBe(true);
    creature = new LivingCreature({ getAliveNeighborsCount: () => 5 });
    expect(creature.isReadyToDie()).toBe(true);
  });

  it('+getOvules() should returns handled Ovule[]', () => {
    const spy = jasmine.createSpy();
    creature = new LivingCreature(
      { getAliveNeighborsCount: () => 4 },
      {
        getAvailableOvules: () => [{ handleBy: spy, getCreature: () => undefined }],
      },
    );
    const ovules = creature.getOvules();
    expect(ovules).toHaveLength(1);
    expect(spy).toHaveBeenCalled();
  });
});
