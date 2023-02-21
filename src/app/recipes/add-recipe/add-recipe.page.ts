import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddIngredientPage } from 'src/app/shared/add-ingredient/add-ingredient.page';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  step: number = 1;
  form!: FormGroup;
  ingredientList: Ingredient[] = [];
  recipeId = uuidv4();

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private modalCtrl: ModalController
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

  get ingredientsFormArray(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  nextStep() {
    this.step = ++this.step;
  }

  previousStep() {
    this.step = --this.step;
  }

  async onAddIngredient() {
    const modal = await this.modalCtrl.create({
      component: AddIngredientPage,
    });

    modal.onDidDismiss().then((data) => {
      const ingredient = data.data;
      if (ingredient) {
        this.ingredientList.push(ingredient);
      }
    });
    return await modal.present();
  }

  onDeteleIngredient(index: number) {
    this.ingredientList.splice(index, 1);
  }

  pushIngredientsToFormArray(arr: Ingredient[]) {
    arr.forEach((item) => {
      const ingredientFormGroup = this.fb.group({
        amount: [item.amount],
        unit: [item.unit],
        ingredient: [item.ingredient, Validators.required],
      });
      this.ingredientsFormArray.push(ingredientFormGroup);
    });
  }

  onSaveRecipe() {
    this.pushIngredientsToFormArray(this.ingredientList);
    this.recipeService.addRecipe(this.form.value);
    this.router.navigateByUrl('/');
    this.ingredientList = [];
    this.initializeForm();
    this.step = 1;
  }
}
