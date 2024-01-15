import { Player } from './player.model';

export class Game {
  constructor(
    public isActive: boolean = false,
    public createdAt: Date = new Date(),
    public finishedAt: Date | null = null,
    public players: Player[] = [],
    public playerTurn: Player,
    public isInGame: boolean = false
  ) {}
}
