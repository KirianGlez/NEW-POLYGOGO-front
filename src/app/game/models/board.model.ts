import { Player } from './player.model';

export class Board {
  constructor(
    public gameId: string,
    public title: string,
    public boxes: Box[]
  ) {}
}

export interface Box {
  id: string;
  playerOwner?: Player;
  title: string;
  price: string;
  rentPrice: number;
  group: string;
  upgradeLevel: number;
}