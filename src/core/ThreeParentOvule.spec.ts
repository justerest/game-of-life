import { Creature } from './Creature';
import { ThreeParentOvule } from './ThreeParentOvule';

describe('ThreeParentOvule', () => {
  let ovule: ThreeParentOvule;

  beforeEach(() => (ovule = new ThreeParentOvule({ create: () => ({} as Creature) })));

  it('should be created', () => {
    expect(ovule).toBeInstanceOf(ThreeParentOvule);
  });

  it('+getCreature() should returns undefined by default', () => {
    expect(ovule.getCreature()).toBeUndefined();
  });

  it('+getCreature() should returns Creature if handled 3 times', () => {
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    expect(ovule.getCreature()).not.toBeUndefined();
  });

  it('+getCreature() should returns undefined if handled more than 3 times', () => {
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    expect(ovule.getCreature()).toBeUndefined();
  });

  it('+getCreature() should returns Creature once if handled 3 times', () => {
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    expect(ovule.getCreature()).not.toBeUndefined();
    expect(ovule.getCreature()).toBeUndefined();
  });

  it('+getCreature() should returns undefined if handled 3 times but was called before', () => {
    ovule.handleBy({} as Creature);
    ovule.handleBy({} as Creature);
    expect(ovule.getCreature()).toBeUndefined();
    ovule.handleBy({} as Creature);
    expect(ovule.getCreature()).toBeUndefined();
  });
});
