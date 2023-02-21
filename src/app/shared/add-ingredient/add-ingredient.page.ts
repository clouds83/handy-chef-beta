import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.page.html',
  styleUrls: ['./add-ingredient.page.scss'],
})
export class AddIngredientPage implements OnInit {
  addWhere!: string;
  form!: FormGroup;

  constructor(private router: Router, private modalCtrl: ModalController) {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('recipes')) {
        this.addWhere = 'recipes';
      }

      if (this.router.url.includes('shopping-list')) {
        this.addWhere = 'shopping-list';
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      amount: new FormControl(1, {
        updateOn: 'change',
      }),
      unit: new FormControl('2', {
        updateOn: 'change',
      }),
      ingredient: new FormControl('3', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddIngredient() {
    const data = this.form.value;
    this.modalCtrl.dismiss(data);
  }
}
