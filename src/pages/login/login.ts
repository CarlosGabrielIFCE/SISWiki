import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';


import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { HomePage } from '../home/home'
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cdVerif: string = "";
  email: string = "";
  senha: string = "";
  usuario: any = {};
  perguntas: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public http: HttpClient,
    public sqlite: SQLite,
    public auth: StorageProvider,
    public serviceProv: LocalStorageProvider,
    public storage: StorageProvider
  ) {
  }

  startNewDB() {
    this.usuario = {
      email: "",
      logado: 0,
    };
  }

  recuperarSenha() {
    this.navCtrl.push(RecuperarSenhaPage);
  }

  ionViewDidLoad() {
     return this.auth.getDB()
       .then((db: SQLiteObject) => {
         db.executeSql("SELECT * FROM info WHERE id=?", [1])
         .then((result) => {
           if (result.rows.length == 1) {
             this.usuario = JSON.parse(result.rows.item(0).usuario);
             console.log(this.usuario);
             if (JSON.stringify(this.usuario.logado) && JSON.stringify(this.usuario.logado == 1)) {
               this.serviceProv.setUsuario(this.usuario);
               this.navCtrl.push(HomePage, {
                 usuario: this.usuario,
               });
             }
           }else {
             this.startNewDB();
             db.executeSql("INSERT INTO info (id, usuario) VALUES (?,?)", [1, JSON.stringify(this.usuario)])
               .then(result => console.log(result))
               .catch(e => console.log(e));
           }
         })
       })
  }

  cadastrarUsuario() {
    this.navCtrl.push(CadastrarUsuarioPage);
  }

  login() {
    if (this.email == "" || this.senha == "") {
      let alert = this.alertCtrl.create({
        title: "Campo Vazio", subTitle: "Preencha os campos necessários para fazer o Login!", buttons: ["OK"]
      });
      alert.present();
    } else {
      let loading = this.loadingCtrl.create();
      loading.present()
      this.http.get("https://www.sisdedetizadora.com.br/seam/resource/rest/loginWiki/" + this.email + "/" + this.senha)
        .subscribe((data) => {
          loading.dismiss();
          console.log(data["erro"]);
          if (data["erro"].cdErro == 102) {
            this.alertCtrl.create({ title: "Aviso", subTitle: "Login ou Senha Inválidos!", buttons: ["OK"] }).present();
          }else if (data["erro"].cdErro == 0) {
            let usuario = {
              email: this.email,
              senha: this.senha,
              logado: 1
            }
            this.storage.SetEmpregado(JSON.stringify(usuario));
            this.navCtrl.push(HomePage);
          }
        })
    }
  }

  exitApp() {
    this.platform.exitApp();
  }

}
