import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/game/models/inventory.model';
import { Skin } from 'src/app/game/models/skin.model';
import { StoreService } from '../../game/store.service';
import { User } from 'src/app/game/models/user.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit{
  skins: Skin[] = [];
  inventory: Inventory[] = [];
  user!: User;

  constructor(private storeService: StoreService) {}
  
  ngOnInit(): void {
    this.obtenerSkins();
  }

  obtenerSkins(){
    this.storeService.obtenerSkins().subscribe(
      (data) => {
        this.skins = data;
      },
      (error) => {
        console.error('Error al obtener las skins', error);
      }
    );
  }

  comprarSkin(userId: string, skinId: string){
    this.storeService.comprarSkin(userId, skinId).subscribe(
      (data) => {
        console.log('Compra exitosa', data);
        //IMPLEMENTAR ACTUALIZAR INVENTARIO
      },
      (error) => {
        console.error('Error al comprar la skin', error);
      }
    );
  }
}
