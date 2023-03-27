import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
  NavParams,
} from '@ionic/angular';
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

  isUpdating = false;
  updatingRecipe!: any;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.isUpdating = true;
        this.updatingRecipe = this.recipeService.getRecipe(paramMap.get('id'));

        this.form.patchValue({
          id: this.updatingRecipe.id,
          name: this.updatingRecipe.name,
          servings: this.updatingRecipe.servings,
          time: this.updatingRecipe.time,
          instructions: this.updatingRecipe.instructions,
          image: this.updatingRecipe.image,
        });

        this.ingredientList = this.updatingRecipe.ingredients;
      }
    });
  }

  initializeForm() {
    this.form = new FormGroup({
      id: new FormControl(this.recipeId),
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(64)],
      }),
      servings: new FormControl(null, {
        updateOn: 'change',
      }),
      time: new FormControl(null, {
        updateOn: 'change',
      }),
      instructions: new FormControl(null, {
        updateOn: 'change',
      }),
      instructionsPragraphs: this.fb.array([]),
      image: new FormControl(null, {
        updateOn: 'change',
      }),
      ingredients: this.fb.array([]),
    });
  }

  get ingredientsFormArray(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get instructionsParagraphsFormArray(): FormArray {
    return this.form.get('instructionsPragraphs') as FormArray;
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

    modal.onDidDismiss().then((result) => {
      if (result.data !== null) {
        const ingredient = result.data;
        if (ingredient) {
          this.ingredientList.push(ingredient);
        }
      }
    });
    return await modal.present();
  }

  onDeteleIngredient(index: number) {
    this.ingredientList.splice(index, 1);
  }

  async onEditIngredient(index: number, editingIngredient: any) {
    const modal = await this.modalCtrl.create({
      component: AddIngredientPage,
      componentProps: {
        editingIngredient: editingIngredient,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data !== null) {
        const ingredient = result.data;
        this.ingredientList[index] = ingredient;
      }
      return;
    });
    return await modal.present();
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

  convertTextareaToParagraphs() {
    const paragraphs: string[] = this.form.value.instructions.split('\n');

    paragraphs.forEach((item) => {
      this.form.value.instructionsPragraphs.push(item);
    });
  }

  async onSaveRecipe() {
    this.pushIngredientsToFormArray(this.ingredientList);

    if (this.form.value.instructions) {
      this.convertTextareaToParagraphs();
    }

    if (this.isUpdating) {
      this.recipeService.updateRecipe(this.updatingRecipe.id, this.form.value);
      this.router.navigate(['/home/recipes', this.updatingRecipe.id], {
        queryParams: { message: 'Recipe updated! ☝️' },
      });
    }

    if (!this.isUpdating) {
      this.recipeService.addRecipe(this.form.value);
      this.router.navigate(['/home/recipes', this.form.value.id], {
        queryParams: { message: 'Recipe saved! 👏' },
      });
    }

    this.ingredientList = [];
    this.initializeForm();
    this.step = 1;
  }

  async onCancel() {
    const alert = await this.alertCtrl.create({
      header: 'Close window',
      cssClass: 'custom-alert',
      message: 'Unsaved changes will be lost.',
      buttons: [
        {
          text: 'Keep Editing',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Confirm',
          cssClass: 'alert-button-delete',
          handler: () => {
            this.navCtrl.back();
          },
        },
      ],
    });
    await alert.present();
  }
}
