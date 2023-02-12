import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: Recipe[] = [
    {
      id: '1',
      name: "Grandma's Special Pizza",
      servings: 4,
      time: 75,
      image:
        'https://img.cybercook.com.br/receitas/559/pizza-de-presunto-e-mussarela-2-840x480.jpeg',
      instructions:
        'Lorem ipsum dolor sit amet gravida lorem ipsum dolor sit amet gravida lorem ipsum dolor sit amet gravida lorem ipsum dolor sit amet gravida lorem ipsum.',
      ingredients: [
        {
          amount: 1,
          unit: '',
          name: 'Onion',
        },
        {
          amount: 250,
          unit: 'grams',
          name: 'Cheese',
        },
        {
          amount: 0.5,
          unit: 'Kg',
          name: 'Flour',
        },
        {
          amount: 100,
          unit: 'grams',
          name: 'Olive',
        },
        {
          amount: 3,
          unit: '',
          name: 'Tomato',
        },
        {
          amount: 50,
          unit: 'grams',
          name: 'Garlic',
        },
        {
          amount: 25,
          unit: 'grams',
          name: 'Basil',
        },
        {
          amount: 50,
          unit: 'grams',
          name: 'Parmesan',
        },
      ],
    },
    {
      id: '2',
      name: 'Nhoque da Hora',
      servings: 4,
      time: 120,
      image:
        'https://img.cybercook.com.br/receitas/598/como-fazer-nhoque-1-840x480.jpeg',
      instructions:
        'sd asd gasdg asfa dfh aefha dfb adfbadrba df s dfv sdfb se fb sefb sdfb sefb sdf',
      ingredients: [
        {
          amount: 1,
          unit: '',
          name: 'Feijolão',
        },
        {
          amount: 250,
          unit: 'grams',
          name: 'Chinelo',
        },
      ],
    },
  ];

  constructor() {}

  get recipes() {
    return [...this._recipes];
  }

  getRecipe(id: any) {
    return { ...this._recipes.find((r) => r.id === id) };
  }
}
