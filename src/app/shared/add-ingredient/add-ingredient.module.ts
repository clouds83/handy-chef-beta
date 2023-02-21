import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIngredientPageRoutingModule } from './add-ingredient-routing.module';

import { AddIngredientPage } from './add-ingredient.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddIngredientPageRoutingModule,
  ],
  declarations: [AddIngredientPage],
})
export class AddIngredientPageModule {}
