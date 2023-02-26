import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';
import { FilterRecipesPipe } from './filter-recipes.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RecipesPageRoutingModule],
  declarations: [RecipesPage, FilterRecipesPipe],
})
export class RecipesPageModule {}
