import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {
  user: any = {
    email: "",
    Cpf: "",
    Cnpj: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }

  recuperarSenha() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.get("https://www.sisdedetizadora.com.br/seam/resource/rest/loginWiki/" + this.user.email + "/" + this.user.Cpf + "/" + this.user.Cnpj, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data) => {
        if (data["erro"].cdErro == 103) {
          this.alertCtrl.create({title: "Aviso", subTitle: data["erro"].msg, buttons: ["OK"]}).present();
        }else {
          this.alertCtrl.create({title: "Aviso", subTitle: data["retorno"], buttons: ["OK"]}).present();
          this.navCtrl.pop();
        }
      })
    loading.dismiss();
    this.navCtrl.pop();
  }

}
