import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _shoppingList: Ingredient[] = [
    {
      amount: 1000,
      unit: 'grams',
      name: 'Feijão',
    },
    {
      amount: 2,
      unit: '',
      name: 'Cebola',
    },
    {
      amount: 200,
      unit: 'ml',
      name: 'Leite',
    },
  ];

  constructor() {}

  get shoppingList() {
    return [...this._shoppingList];
  }
}
