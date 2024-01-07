import { Component } from '@angular/core';
import { Game } from '../models/game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  public game!: Game;

  constructor(gameService: GameService) {
    gameService.checkInGame().subscribe((data) => {
      this.game = data.game;
      console.log(data);
    });
  }
}
