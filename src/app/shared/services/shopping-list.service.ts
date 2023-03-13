import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public _shoppingList: any = [];

  constructor(public storage: Storage) {}

  async loadShoppingList() {
    await this.storage.create(); // Initialize the storage service

    // Get data from storage
    const data = await this.storage.get('shoppingList');

    if (data) {
      this._shoppingList = data;
      //this.recipesChanged.next(this._recipes);
    } else {
      this._shoppingList = [];
    }
  }

  getShoppingList() {
    return this._shoppingList;
  }

  clearShoppingList() {
    this._shoppingList = [];
    this.storage.set('shoppingList', this._shoppingList);
  }
}
