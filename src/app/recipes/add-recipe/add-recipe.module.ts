import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { AddRecipePageRoutingModule } from './add-recipe-routing.module';

import { AddRecipePage } from './add-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddRecipePageRoutingModule,
        
  ],
  declarations: [AddRecipePage],

})
export class AddRecipePageModule {}
