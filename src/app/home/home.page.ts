import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddIngredientPage } from '../shared/add-ingredient/add-ingredient.page';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  activeTab!: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private shoppingListService: ShoppingListService,
    private storage: Storage
  ) {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('recipes')) {
        this.activeTab = 'recipes';
      }

      if (this.router.url.includes('shopping-list')) {
        this.activeTab = 'shopping-list';
      }
    });
  }

  ngOnInit() {}

  async addShoppingListItem() {
    const modal = await this.modalCtrl.create({
      component: AddIngredientPage,
    });
    modal.onDidDismiss().then((data) => {
      const ingredient = data.data;
      if (ingredient) {
        this.shoppingListService._shoppingList.push(ingredient);
        this.storage.set(
          'shoppingList',
          this.shoppingListService._shoppingList
        );
      }
    });
    return await modal.present();
  }
}
