import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  time: number;
  instructions: string;
  image: string;
  ingredients: Ingredient[];
}
