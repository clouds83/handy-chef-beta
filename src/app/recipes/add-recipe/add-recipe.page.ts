import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  step: number = 1;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      id: new FormControl('3'),
      name: new FormControl('Lorem ipsum', {
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
        'https://play-lh.googleusercontent.com/8QnH9AhsRfhPott7REiFUXXJLRIxi8KMAP0mFAZpYgd44OTOCtScwXeb5oPe1E4eP4oF',
        {
          updateOn: 'change',
        }
      ),
      ingredients: this.fb.array([
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
      ]),
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

  onSaveRecipe() {
    this.recipeService.addRecipe(this.form.value);
    this.router.navigateByUrl('/');
  }
}
