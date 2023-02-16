import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private _ingredientList: Ingredient[] = [];

  constructor() {}

  get ingredients() {
    return this._ingredientList;
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredientList.push(ingredient);
  }

  resetIngredients() {
    this._ingredientList = [];
  }
}
