import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ToasterService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.page.html',
  styleUrls: ['./recipe-item.page.scss'],
})
export class RecipeItemPage implements OnInit {
  recipe!: any;
  selectedTab: string = 'ingredients';
  id!: number;
  selectedIngredients: any = [];

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private toastService: ToasterService,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.recipe = this.recipeService.getRecipe(paramMap.get('id'));
      this.id = this.recipe.id;
    });

    this.route.queryParams.subscribe((params) => {
      const message = params['message'];
      if (message) {
        this.toastService.greenToast(message);
      }
    });
  }

  backButton() {
    this.navCtrl.navigateBack('/');
  }

  isIngredientSelected() {
    if (
      this.recipe.ingredients.filter(
        (ingredient: any) => ingredient.selected
      ) == 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSendToShoppingList() {
    this.selectedIngredients = this.recipe.ingredients.filter(
      (ingredient: any) => ingredient.selected
    );

    if (this.selectedIngredients.length == 0) {
      this.shoppingListService._shoppingList.push(...this.recipe.ingredients);
      this.storage.set('shoppingList', this.shoppingListService._shoppingList);
    }

    if (this.selectedIngredients.length > 0) {
      this.shoppingListService._shoppingList.push(...this.selectedIngredients);
      this.storage.set('shoppingList', this.shoppingListService._shoppingList);

      this.recipe.ingredients.forEach((ingredient: any) => {
        ingredient.selected = false;
      });
    }

    this.toastService.greenToast('Ingredients sent, happy shopping! 😊');
  }

  onEditRecipe() {
    this.router.navigate(['edit-recipe'], { relativeTo: this.route });
  }

  async onDeleteRecipe() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      cssClass: 'custom-alert',
      message: `Are you sure you want to delete <span>${this.recipe.name}</span>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-delete',
          handler: () => {
            this.recipeService.deleteRecipe(this.id);
            this.router.navigateByUrl('/');
            this.toastService.redToast('Farewell, recipe. 😔');
          },
        },
      ],
    });
    await alert.present();
  }
}
