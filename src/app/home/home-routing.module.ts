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
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../recipes/recipes.module').then(
                (m) => m.RecipesPageModule
              ),
          },
          {
            path: ':id',
            loadChildren: () =>
              import('../recipes/recipe-item/recipe-item.module').then(
                (m) => m.RecipeItemPageModule
              ),
          },
        ],
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
