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
      ingredient: 'Feijão',
    },
    {
      amount: 2,
      unit: '',
      ingredient: 'Cebola',
    },
    {
      amount: 200,
      unit: 'ml',
      ingredient: 'Leite',
    },
  ];

  constructor() {}

  get shoppingList() {
    return this._shoppingList;
  }
}
