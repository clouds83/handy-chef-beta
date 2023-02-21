import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'recipes',
        loadChildren: () =>
          import('../recipes/recipes.module').then((m) => m.RecipesPageModule),
      },
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('../shopping-list/shopping-list.module').then(
            (m) => m.ShoppingListPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/home/recipes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'recipes/add-item',
    loadChildren: () =>
      import('../recipes/add-recipe/add-recipe.module').then(
        (m) => m.AddRecipePageModule
      ),
  },

  {
    path: 'recipes/add-item/add-ingredient',
    loadChildren: () =>
      import('../shared/add-ingredient/add-ingredient.module').then(
        (m) => m.AddIngredientPageModule
      ),
  },

  {
    path: 'recipes/:id',
    loadChildren: () =>
      import('../recipes/recipe-item/recipe-item.module').then(
        (m) => m.RecipeItemPageModule
      ),
  },

  {
    path: 'recipes/:id/add-ingredient',
    loadChildren: () =>
      import('../shared/add-ingredient/add-ingredient.module').then(
        (m) => m.AddIngredientPageModule
      ),
  },

  {
    path: 'shopping-list/add-item',
    loadChildren: () =>
      import('../shared/add-ingredient/add-ingredient.module').then(
        (m) => m.AddIngredientPageModule
      ),
  },

  {
    path: '',
    redirectTo: '/home/recipes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
