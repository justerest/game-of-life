import { Creature } from './Creature';
import { Game } from './Game';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it('+addCreature() should add creature to game', () => {
    expect(game.getAliveCreaturesCount()).toBe(0);
    game.addCreature({} as Creature);
    expect(game.getAliveCreaturesCount()).toBe(1);
  });

  it('+tick() should kill creatures that ready to die', () => {
    game.addCreature({ isReadyToDie: () => true } as Creature);
    game.tick();
    expect(game.getAliveCreaturesCount()).toBe(0);
  });

  it('+tick() should not kill creatures that not ready to die', () => {
    game.addCreature({ isReadyToDie: () => false } as Creature);
    game.tick();
    expect(game.getAliveCreaturesCount()).toBe(1);
  });

  it('+tick() should add creatures from ovules', () => {
    game.addCreature({
      isReadyToDie: () => false,
      getOvules: () => [{ getCreature: () => ({}) }],
    } as Creature);
    game.tick();
    expect(game.getAliveCreaturesCount()).toBe(2);
  });
});
