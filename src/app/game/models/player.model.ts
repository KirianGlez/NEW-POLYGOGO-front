import { User } from './user.model';

export class Player {
  constructor(
    public _id: string,
    public user: User,
    public game: string,
    public money: number = 0,
    public position: number = 0,
    public playing: boolean = false,
    public dice: number = 0
  ) {}
}
