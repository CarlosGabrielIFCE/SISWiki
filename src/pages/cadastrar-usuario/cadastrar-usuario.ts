import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage {
  user: any = {
    nmUsuario: "",
    email: "",
    dddFixo: "",
    telefoneFixo: "",
    dddCelular: "",
    telefoneCelular: "",
    Cpf: "",
    Cnpj: ""
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  salvarNovoUsuario() {
    var post = {
      "nome": this.user.nmUsuario,
      "email": this.user.email,
      "dddFixo": this.user.dddFixo,
      "telefoneFixo": this.user.telefoneFixo,
      "dddCelular": this.user.dddCelular,
      "telefoneCelular": this.user.telefoneCelular,
      "cpf": this.user.Cpf,
      "cnpj": this.user.Cnpj
    }
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post("http://www.sisdedetizadora.com.br/pre/seam/resource/rest/baseConhecimentoMobile/cadastrarUsoBase", JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data) => {
        console.log(data["retorno"]);
        this.alertCtrl.create({title: "Aviso", subTitle: data["retorno"], buttons: ["OK"]}).present();
      })
    loading.dismiss();
    this.navCtrl.pop();
  }

}
