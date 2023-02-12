import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: any;
  name: string;
  servings: number;
  time: number;
  instructions: string;
  image: string;
  ingredients: Ingredient[];
}
