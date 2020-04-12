import { Game } from './Game';

describe('Game', () => {
  let game: Game;

  beforeEach(() => (game = new Game()));

  it('+getFilledPoints() should returns empty []', () => {
    expect(game.getAlivePoints()).toEqual([]);
  });

  it('+fill() should add Creature at point', () => {
    game.fill({ x: 0, y: 0 });
    expect(game.getAlivePoints()).toEqual([{ x: 0, y: 0 }]);
  });

  it('+tick() should kill single Creature', () => {
    game.fill({ x: 0, y: 0 });
    game.tick();
    expect(game.getAlivePoints()).toEqual([]);
  });

  it('+tick() should keep alive creature', () => {
    game.fill({ x: 4, y: 4 });
    game.fill({ x: 5, y: 5 });
    game.fill({ x: 6, y: 6 });
    game.tick();
    expect(game.getAlivePoints()).toEqual([{ x: 5, y: 5 }]);
  });

  it('+tick() should add new creature', () => {
    game.fill({ x: 4, y: 4 });
    game.fill({ x: 5, y: 5 });
    game.fill({ x: 6, y: 3 });
    game.tick();
    expect(game.getAlivePoints()).toEqual([{ x: 5, y: 4 }]);
  });

  it('+tick() should add new creature and die on next', () => {
    game.fill({ x: 4, y: 4 });
    game.fill({ x: 5, y: 5 });
    game.fill({ x: 6, y: 3 });
    game.tick();
    expect(game.getAlivePoints()).toEqual([{ x: 5, y: 4 }]);
    game.tick();
    expect(game.getAlivePoints()).toEqual([]);
  });

  it('horizontal/vertical line toggle', () => {
    game.fill({ x: 4, y: 5 });
    game.fill({ x: 5, y: 5 });
    game.fill({ x: 6, y: 5 });
    game.tick();
    expect(game.getAlivePoints()).toEqual([
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
    ]);
    game.tick();
    game.tick();
    game.tick();
    expect(game.getAlivePoints()).toEqual([
      { x: 4, y: 5 },
      { x: 5, y: 5 },
      { x: 6, y: 5 },
    ]);
  });
});
