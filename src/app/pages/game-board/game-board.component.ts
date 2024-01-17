import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../game/models/game.model';
import { GameService } from '../../game/game.service';
import { Router } from '@angular/router';
import { Player } from '../../game/models/player.model';
import { Subject, interval } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  public game!: Game;
  public player!: Player;
  private gameService: GameService;
  private destroy$ = new Subject<void>();

  constructor(gameService: GameService, private router: Router) {
    this.gameService = gameService;
    this.recargarDatos();
    interval(5000)
      .pipe(
        takeUntil(this.destroy$) // Se detendrá cuando se destruya el componente
      )
      .subscribe(() => {
        this.recargarDatos();
      });
  }

  recargarDatos() {
    this.gameService.checkInGame().subscribe((data) => {
      this.game = data.game;
      this.player = data.player;
      console.log(data);
      if (data.message == false) {
        this.router.navigate(['/home']);
      }
    });
  }

  getPositionClass(index: number): string {
    let positionClass = '';
    switch (index) {
      case 0:
        positionClass = 'absolute top-0 left-0';
        break;
      case 1:
        positionClass = 'absolute top-0 right-0';
        break;
      case 2:
        positionClass = 'absolute bottom-0 left-0';
        break;
      case 3:
        positionClass = 'absolute bottom-0 right-0';
        break;
      default:
        break;
    }
    // Agregar márgenes
    return positionClass + ' m-12'; // Puedes ajustar el valor de 'm-2' según tus necesidades
  }

  tirarDados() {
    this.gameService.rollDice().subscribe((data) => {
      this.recargarDatos();
    });
  }

  pasarTurno() {
    this.gameService.nextTurn().subscribe((data) => {
      this.recargarDatos();
    });
  }
}
