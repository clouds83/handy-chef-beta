import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientService } from 'src/app/shared/services/ingredient.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  step: number = 1;
  form!: FormGroup;
  ingredientList: Ingredient[] = this.ingredientService.ingredients;
  recipeId = (this.recipeService.recipes.length + 1).toString();

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      id: new FormControl(this.recipeId),
      name: new FormControl('Feijoadombers', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.maxLength(56),
          Validators.minLength(3),
        ],
      }),
      servings: new FormControl(64, {
        updateOn: 'change',
      }),
      time: new FormControl(99, {
        updateOn: 'change',
      }),
      instructions: new FormControl(
        'Loremmmmmmmm lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas lkas ',
        {
          updateOn: 'change',
        }
      ),
      image: new FormControl(
        'https://img.cybercook.com.br/receitas/776/feijoada.jpeg',
        {
          updateOn: 'change',
        }
      ),
      ingredients: this.fb.array([]),
    });
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  nextStep() {
    this.step = ++this.step;
  }

  previousStep() {
    this.step = --this.step;
  }

  addIngredientsToRecipeForm(arr: Ingredient[]) {
    arr.forEach((item) => {
      const itemFormGroup = this.fb.group({
        amount: [item.amount],
        unit: [item.unit],
        ingredient: [item.ingredient, Validators.required],
      });
      this.ingredients.push(itemFormGroup);
    });
  }

  onSaveRecipe() {
    this.addIngredientsToRecipeForm(this.ingredientList);
    this.recipeService.addRecipe(this.form.value);
    this.router.navigateByUrl('/');
    this.ingredientService.resetIngredients();
    this.ingredientList = this.ingredientService.ingredients;
    this.initializeForm();
    this.step = 1;
  }
}
