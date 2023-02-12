import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  loadedRecipes!: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadedRecipes = this.recipeService.recipes;
  }
}
