import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResultadoDetailPage } from '../resultado-detail/resultado-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  textoBusca: string;
  perguntas: any = [];
  constructor(public navCtrl: NavController, public http: HttpClient, public loadingCtrl: LoadingController) {

  }

  buscarWiki() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.get("http://localhost:3000/perguntas")
    .subscribe((data) => {
      loading.dismiss();
      this.perguntas = data;
      console.log(this.perguntas);
    })
  }

  openAnswer(index) {
    this.navCtrl.push(ResultadoDetailPage, {
      codigo: this.perguntas[index].codigo
    })
  }

}
