import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeItemPage } from './recipe-item.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeItemPageRoutingModule {}
