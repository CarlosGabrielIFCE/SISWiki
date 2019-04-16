import { Component } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResultadoDetailPage } from '../resultado-detail/resultado-detail';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AdMobProvider } from '../../providers/ad-mob/ad-mob';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AdMobProvider]
})
export class HomePage {
  perguntas: any = [];
  perguntasSalvas: any = [];
  cont: number = 0;
  textoBusca: string = ""
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public storage: StorageProvider,
    public admob: AdMobProvider,
    public alertCtrl: AlertController,
    public localStorage: LocalStorageProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      var admobid = {
        banner: 'ca-app-pub-5400954463123622/6642702650',
        interstitial: 'ca-app-pub-5400954463123622/1154749866'
      };
      this.admob.showBanner();
    })
  }

  deslogar() {
    this.alertCtrl.create({
      title: "Aviso",
      subTitle: "Deseja realmente sair do Universidade das Pragas Wiki? Você terá de fazer o Login Novamente!",
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
          this.storage.Deslogar();
          this.platform.exitApp();
        }
      }]
    }).present();
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
    this.http.post("https://www.sisdedetizadora.com.br/seam/resource/rest/baseConhecimentoMobile/buscarBase", JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
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
        //this.storage.SetPerguntasAtivas(JSON.stringify(this.perguntasSalvas));
      })
    loading.dismiss();
  }

  ionViewDidLoad() {
    this.perguntasSalvas = this.localStorage.getPerguntas();
  }

  openAnswer(index) {
    if (this.cont%3 == 0) {
      this.admob.showInterstitial();
      this.cont++;
      console.log(this.cont);
    }else {
      this.cont++;
      console.log(this.cont);
    }
    this.navCtrl.push(ResultadoDetailPage, {
      codigo: this.perguntas[index].codigo
    })
  }

  refazerBusca() {
    var post = {
      "textoBusca" : this.textoBusca,
    }
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post("https://www.sisdedetizadora.com.br/seam/resource/rest/baseConhecimentoMobile/buscarBase", JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data) => {
        if (data["sucesso"].length == 0) {
          this.alertCtrl.create({title: "Aviso", subTitle: "Nenhuma resposta encontrada", buttons: ["OK"]}).present();
        }
        this.perguntas.length = data["sucesso"].length;
        for (let i = 0;i < this.perguntas.length;i++){
          this.perguntas[i] = JSON.parse(data["sucesso"][i]);
        }
        //this.storage.SetPerguntasAtivas(JSON.stringify(this.perguntasSalvas));
      })
    loading.dismiss();
  }

}
