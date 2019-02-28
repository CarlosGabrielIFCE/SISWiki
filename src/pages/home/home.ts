import { Component } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResultadoDetailPage } from '../resultado-detail/resultado-detail';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AdMobPro } from '@ionic-native/admob-pro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  perguntas: any = [];
  perguntasSalvas: any = [];
  textoBusca: string = ""
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public storage: StorageProvider,
    public admob: AdMobPro,
    public alertCtrl: AlertController,
    public localStorage: LocalStorageProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      var admobid = {
        banner: 'ca-app-pub-5400954463123622/6642702650',
        interstitial: 'ca-app-pub-5400954463123622/1154749866'
      };

      this.admob.createBanner({
        adId: admobid.banner,
        //isTesting: true,
        autoShow: true,
        position: this.admob.AD_POSITION.BOTTOM_CENTER
      })

      this.admob.prepareInterstitial({
        adId: admobid.interstitial,
        //isTesting: true,
        autoShow: false
      })
    })
  }

  deslogar() {
    this.alertCtrl.create({
      title: "Aviso",
      subTitle: "Deseja realmente sair do SIS Wiki?",
      buttons: [{
        text: "Não",
        role: "cancel",
        handler: () => {
          console.log("Botão Não Clicado");
        }
      }, {
        text: "Sim",
        role: "destructive",
        handler: () => {
          this.platform.exitApp();
        }
      }]
    }).present();
  }

  showInterstitialAd() {
    if (AdMobPro) {
      this.admob.showInterstitial();
    }
  }

  buscarWiki() {
    if (this.textoBusca == "") {
      this.alertCtrl.create({title: "Aviso", subTitle: "Insira um texto para fazer a busca!", buttons: ["OK"]}).present();
      return;
    }
    var post = {
      "textoBusca" : this.textoBusca,
    }
    let loading = this.loadingCtrl.create();
    this.perguntasSalvas.push(this.textoBusca);
    loading.present();
    this.http.post("https://www.sisdedetizadora.com.br/pre/seam/resource/rest/baseConhecimentoMobile/buscarBase", JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data) => {
        if (data["sucesso"].length == 0) {
          this.alertCtrl.create({title: "Aviso", subTitle: "Nenhuma resposta encontrada", buttons: ["OK"]}).present();
        }
        this.perguntas.length = data["sucesso"].length;
        for (let i = 0;i < this.perguntas.length;i++){
          this.perguntas[i] = JSON.parse(data["sucesso"][i]);
        }
        console.log(this.perguntas);
        console.log(this.perguntasSalvas);
        this.storage.SetPerguntasAtivas(JSON.stringify(this.perguntasSalvas));
      })
    loading.dismiss();
  }

  ionViewDidLoad() {
    this.perguntasSalvas = this.localStorage.getPerguntas();
  }

  openAnswer(index) {
    this.admob.showInterstitial();
    this.navCtrl.push(ResultadoDetailPage, {
      codigo: this.perguntas[index].codigo
    })
  }

  refazerBusca(index) {
    this.admob.showInterstitial();
    this.navCtrl.push(ResultadoDetailPage, {
      codigo: this.perguntasSalvas[index].codigo
    })
  }

}
