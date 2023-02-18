import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.page.html',
  styleUrls: ['./recipe-item.page.scss'],
})
export class RecipeItemPage implements OnInit {
  recipe!: any;
  selectedTab: string = 'ingredients';
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      this.recipe = this.recipeService.getRecipe(paramMap.get('id'));
      this.id = this.recipe.id;

      console.log(this.recipe);
    });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigateByUrl('/');

    console.log('deletando');
  }
}
