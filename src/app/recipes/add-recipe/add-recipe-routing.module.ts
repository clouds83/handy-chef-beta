import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecipePage } from './add-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecipePage,
  },
  {
    path: 'add-ingredient',
    loadChildren: () =>
      import('../../shared/add-ingredient/add-ingredient.module').then(
        (m) => m.AddIngredientPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecipePageRoutingModule {}
