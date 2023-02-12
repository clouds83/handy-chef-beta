import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeItemPageRoutingModule } from './recipe-item-routing.module';

import { RecipeItemPage } from './recipe-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeItemPageRoutingModule
  ],
  declarations: [RecipeItemPage]
})
export class RecipeItemPageModule {}
