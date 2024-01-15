import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../game/models/game.model';
import { GameService } from '../../game/game.service';
import { Router } from '@angular/router';
import { Player } from '../../game/models/player.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  public game!: Game;
  public player!: Player;

  constructor(gameService: GameService, private router: Router) {
    gameService.checkInGame().subscribe((data) => {
      this.game = data.game;
      this.player = data.player;
      if (data.message == false) {
        this.router.navigate(['/home']);
      }
    });
  }
}
