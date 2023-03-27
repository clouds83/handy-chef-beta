import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private platform: Platform
  ) {
    SplashScreen.hide();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit(): void {
    // SplashScreen.hide();
    //this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.router.navigateByUrl('splash');
  //   });
  // }
  // initializeApp() {
  //   this.platform.ready().then(async () => {
  //     SplashScreen.hide();
  //   });
  // }
}
