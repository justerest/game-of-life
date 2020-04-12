import { Board } from './Board';
import { Creature } from './Creature';

describe('Board', () => {
  let board: Board;

  beforeEach(() => (board = new Board(7, 5)));

  it('+getCells() should returns Cell[][] by width/height', () => {
    const cells = board.getCells();
    expect(cells).toHaveLength(7);
    expect(cells[1]).toHaveLength(5);
    expect(cells.flat()).toHaveLength(7 * 5);
  });

  it('+fillCell() should add creature into (x,y) cell', () => {
    const creature = {} as Creature;
    board.fillCell({ x: 0, y: 0, creature });
    expect(board.getCells()[0][0].creature).toBe(creature);
  });
});
