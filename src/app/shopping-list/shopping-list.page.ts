import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  loadedShoppingList: Ingredient[] = this.shoppingListService.shoppingList;
  subscription!: Subscription;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  deleteShoppingItem(index: number) {
    this.shoppingListService.shoppingList.splice(index, 1);
    console.log(this.shoppingListService.shoppingList);
  }

  onEditItem(index: number) {
    this.editMode = true;
    //this.subscription = true TODO
  }
}
