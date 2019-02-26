import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResultadoDetailPage } from '../resultado-detail/resultado-detail';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  perguntas: any = [];

  constructor(public navCtrl: NavController, public http: HttpClient, public admob: AdMobFree) {
    this.showBanner();
    this.http.get("http://localhost:3000/perguntas")
      .subscribe((data) => {
        this.perguntas = data;
        console.log(this.perguntas);
      })
  }

  openAnswer(index) {
    this.launchInterstitial();
    this.navCtrl.push(ResultadoDetailPage, {
      codigo: this.perguntas[index].codigo
    })
  }

  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-8722097021252324/6908364338"
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // successionic c
    }).catch(e => console.log(e));

  }

  launchInterstitial() {

    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-8722097021252324/4002821784"
    };

    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare().then(() => {
      // success
    });

  }

}
