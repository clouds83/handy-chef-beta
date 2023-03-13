import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subscription } from 'rxjs';
import { AddIngredientPage } from '../shared/add-ingredient/add-ingredient.page';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  subscription!: Subscription;
  editMode = false;
  //shoppingList = this.shoppingListService.getShoppingList();

  constructor(
    public shoppingListService: ShoppingListService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.shoppingListService.loadShoppingList();
  }

  onDeleteShoppingItem(index: number) {
    this.shoppingListService._shoppingList.splice(index, 1);
    this.storage.set('shoppingList', this.shoppingListService._shoppingList);
  }

  async onClearList() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete all items?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.shoppingListService.clearShoppingList();
          },
        },
      ],
    });
    await alert.present();
  }

  async onEditItem(index: number, editingIngredient: any) {
    const modal = await this.modalCtrl.create({
      component: AddIngredientPage,
      componentProps: {
        editingIngredient: editingIngredient,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data !== null) {
        const ingredient = result.data;
        this.shoppingListService._shoppingList[index] = ingredient;
        this.storage.set(
          'shoppingList',
          this.shoppingListService._shoppingList
        );
      }
      return;
    });
    return await modal.present();
  }
}
