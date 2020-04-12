import { assert } from 'src/utils/assert';
import { Creature } from './Creature';

interface Cell {
  x: number;
  y: number;
  creature?: Creature;
}

export class Board {
  private cells: Cell[][] = new Array(this.width)
    .fill(0)
    .map((_, x) => new Array(this.height).fill(0).map((__, y) => ({ x, y })));

  constructor(private width: number, private height: number) {}

  getCells(): Cell[][] {
    return this.cells;
  }

  fillCell(cell: Cell): void {
    assert(this.cells[cell.x][cell.y]);
    this.cells[cell.x][cell.y] = cell;
  }
}
