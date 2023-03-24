import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public _recipes: Recipe[] = [];

  // [
  //   {
  //     id: '1',
  //     name: "Grandma's Special Pizza",
  //     servings: 4,
  //     time: 75,
  //     image:
  //       'https://img.cybercook.com.br/receitas/559/pizza-de-presunto-e-mussarela-2-840x480.jpeg',
  //     instructions:
  //       'Lorem ipsum dolor sit amet gravida lorem ipsum dolor sit amet gravida lorem ipsum dolor sit amet gravida lorem ipsum dolor sit amet gravida lorem ipsum.',
  //     ingredients: [
  //       {
  //         amount: 1,
  //         unit: '',
  //         ingredient: 'Onion',
  //       },
  //       {
  //         amount: 250,
  //         unit: 'grams',
  //         ingredient: 'Cheese',
  //       },
  //       {
  //         amount: 0.5,
  //         unit: 'Kg',
  //         ingredient: 'Flour',
  //       },
  //       {
  //         amount: 100,
  //         unit: 'grams',
  //         ingredient: 'Olive',
  //       },
  //       {
  //         amount: 3,
  //         unit: '',
  //         ingredient: 'Tomato',
  //       },
  //       {
  //         amount: 50,
  //         unit: 'grams',
  //         ingredient: 'Garlic',
  //       },
  //       {
  //         amount: 25,
  //         unit: 'grams',
  //         ingredient: 'Basil',
  //       },
  //       {
  //         amount: 50,
  //         unit: 'grams',
  //         ingredient: 'Parmesan',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     name: 'Nhoque da Hora',
  //     servings: 4,
  //     time: 120,
  //     image:
  //       'https://img.cybercook.com.br/receitas/598/como-fazer-nhoque-1-840x480.jpeg',
  //     instructions:
  //       'sd asd gasdg asfa dfh aefha dfb adfbadrba df s dfv sdfb se fb sefb sdfb sefb sdf',
  //     ingredients: [
  //       {
  //         amount: 1,
  //         unit: '',
  //         ingredient: 'Feijolão',
  //       },
  //       {
  //         amount: 250,
  //         unit: 'grams',
  //         ingredient: 'Chinelo',
  //       },
  //     ],
  //   },
  // ];

  recipesChanged = new Subject<Recipe[]>();

  constructor(public storage: Storage) {
    this.loadRecipes();
  }

  async loadRecipes() {
    await this.storage.create(); // Initialize the storage service

    // Get data from storage
    const data = await this.storage.get('recipes');

    if (data) {
      this._recipes = data;
      this.recipesChanged.next(this._recipes);
    } else {
      this._recipes = [];
    }
  }

  recipeId() {
    this._recipes.length;
  }

  get recipes() {
    return this._recipes;
  }

  getRecipe(id: any) {
    return { ...this._recipes.find((recipe) => recipe.id === id) };
  }

  getIndex(id: any) {
    return this._recipes.findIndex((recipe) => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this._recipes.sort((a, b) => a.name.localeCompare(b.name));
    this.storage.set('recipes', this._recipes);
    this.recipesChanged.next(this._recipes);
  }

  updateRecipe(id: any, newRecipe: Recipe) {
    this._recipes[this.getIndex(id)] = newRecipe;
    this._recipes.sort((a, b) => a.name.localeCompare(b.name));
    this.storage.set('recipes', this._recipes);
    this.recipesChanged.next(this._recipes);
  }

  deleteRecipe(id: any) {
    this._recipes.splice(this.getIndex(id), 1);
    this._recipes.sort((a, b) => a.name.localeCompare(b.name));
    this.storage.set('recipes', this._recipes);
    this.recipesChanged.next(this._recipes);
  }
}
