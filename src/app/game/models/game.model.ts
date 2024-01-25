import { Board } from './board.model';
import { Player } from './player.model';

export class Game {
  constructor(
    public isActive: boolean = false,
    public createdAt: Date = new Date(),
    public finishedAt: Date | null = null,
    public players: Player[] = [],
    public turn: string,
    public board: Board,
    public isInGame: boolean = false
  ) {}
}
