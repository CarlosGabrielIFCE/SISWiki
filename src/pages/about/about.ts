import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResultadoDetailPage } from '../resultado-detail/resultado-detail';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  textoBusca: string;
  perguntas: any = [];
  constructor(public navCtrl: NavController, 
              public http: HttpClient, 
              public loadingCtrl: LoadingController, 
              public storage: StorageProvider,
              public localStorage: LocalStorageProvider) {

  }

  buscarWiki() {
    var post = {
      "textoBusca" : this.textoBusca,
    }
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post("https://www.sisdedetizadora.com.br/pre/seam/resource/rest/baseConhecimentoMobile/buscarBase", JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data) => {
        console.log(data);
        this.perguntas = JSON.parse(data["sucesso"]);
      })
    loading.dismiss();
  }

  openAnswer(index) {
    this.navCtrl.push(ResultadoDetailPage, {
      codigo: this.perguntas[index].codigo
    })
  }

}
