import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subscription } from 'rxjs';
import { AddIngredientPage } from '../shared/add-ingredient/add-ingredient.page';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { ToasterService } from '../shared/services/toast.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  subscription!: Subscription;
  editMode = false;

  constructor(
    public shoppingListService: ShoppingListService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private toastService: ToasterService
  ) {}

  ngOnInit() {
    this.shoppingListService.loadShoppingList();
  }

  onDeleteShoppingItem(index: number) {
    this.shoppingListService._shoppingList.splice(index, 1);
    this.storage.set('shoppingList', this.shoppingListService._shoppingList);
    this.toastService.redToast('Item crossed off. 👋');
  }

  async onClearList() {
    const alert = await this.alertCtrl.create({
      header: 'Clear List?',
      cssClass: 'custom-alert',
      message: 'This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Clear Items',
          cssClass: 'alert-button-delete',
          handler: () => {
            this.shoppingListService.clearShoppingList();
            this.toastService.redToast('Shopping list cleared. 😔');
          },
        },
      ],
    });
    await alert.present();
  }

  async onEditItem(index: number, editingIngredient: any, isShoppingList: any) {
    const modal = await this.modalCtrl.create({
      component: AddIngredientPage,
      componentProps: {
        editingIngredient: editingIngredient,
        isShoppingList: isShoppingList,
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
