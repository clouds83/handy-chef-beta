import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  loadedRecipes: Recipe[] = [];
  subscription!: Subscription;
  searchTerm: string = '';

  //recipes$ = of(this.loadedRecipes);

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipesUpdated) => {
        this.loadedRecipes = recipesUpdated;
      }
    );

    this.loadedRecipes = this.recipeService._recipes;
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
