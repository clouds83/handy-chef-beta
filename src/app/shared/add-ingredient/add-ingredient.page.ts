import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientService } from '../services/ingredient.service';
import { RecipeService } from '../services/recipe.service';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.page.html',
  styleUrls: ['./add-ingredient.page.scss'],
})
export class AddIngredientPage implements OnInit {
  addWhere!: string;
  form!: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('recipes')) {
        this.addWhere = 'recipes';
      }

      if (this.router.url.includes('shopping-list')) {
        this.addWhere = 'shopping-list';
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      amount: new FormControl(1, {
        updateOn: 'change',
      }),
      unit: new FormControl('2', {
        updateOn: 'change',
      }),
      ingredient: new FormControl('3', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  onAddIngredient() {
    if (this.addWhere == 'recipes') {
      const ingredient = this.form.value;

      this.ingredientService.addIngredient(ingredient);

      this.initializeForm();

      this.router.navigateByUrl('/home/recipes/add-item');
    }

    if (this.addWhere == 'shopping-list') {
      const ingredient = this.form.value;

      this.shoppingListService.addShoppingItem(ingredient);

      this.initializeForm();

      this.router.navigateByUrl('/home/shopping-list');
    }
  }
}
