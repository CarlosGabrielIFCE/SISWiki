import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { LoginPage } from '../pages/login/login';
//import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: StorageProvider) {
    platform.ready().then(() => {
      this.storage.createDataBase();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
