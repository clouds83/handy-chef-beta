import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.page.html',
  styleUrls: ['./add-ingredient.page.scss'],
})
export class AddIngredientPage implements OnInit {
  //addWhere!: string;
  form!: FormGroup;
  @Input() editingIngredient: any;
  @Input() isShoppingList: any;

  constructor(private router: Router, private modalCtrl: ModalController) {
    // this.router.events.subscribe(() => {
    //   if (this.router.url.includes('recipes')) {
    //     this.addWhere = 'recipes';
    //   }
    //   if (this.router.url.includes('shopping-list')) {
    //     this.addWhere = 'shopping-list';
    //   }
    // });
  }

  async ngOnInit() {
    this.initializeForm();

    if (this.editingIngredient) {
      this.form.patchValue({
        amount: this.editingIngredient.amount,
        unit: this.editingIngredient.unit,
        ingredient: this.editingIngredient.ingredient,
      });
    }
  }

  initializeForm() {
    this.form = new FormGroup({
      amount: new FormControl(null, {
        updateOn: 'change',
      }),
      unit: new FormControl(null, {
        updateOn: 'change',
      }),
      ingredient: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  onAddIngredient() {
    if (this.form.valid) {
      const data = this.form.value;
      this.modalCtrl.dismiss(data);
    } else {
      this.modalCtrl.dismiss();
    }
  }

  async onCancel() {
    await this.modalCtrl.dismiss(null);
  }
}
