import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  activeTab!: any;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('recipes')) {
        this.activeTab = 'recipes';
      }

      if (this.router.url.includes('shopping-list')) {
        this.activeTab = 'shopping-list';
      }
    });
  }

  ngOnInit() {}
}
