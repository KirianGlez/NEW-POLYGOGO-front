import { Component, Input } from '@angular/core';
import { Board } from '../models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input()
  board!: Board;

  order = [7, 8, 9, 10, 11, 12, 13, 14, 6, 15, 5, 16, 4, 17, 3, 18, 2, 19, 1, 20, 0, 27, 26, 25, 24, 23, 22, 21];

  getOrderedBoxes(): any[] {
    return this.order.map(index => this.board.boxes[index]);
  }
}
