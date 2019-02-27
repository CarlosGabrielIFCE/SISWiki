import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';


import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { TabsPage } from '../tabs/tabs';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cdVerif: string = "";
  email: string = "";
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
    public serviceProv: LocalStorageProvider
    ) {
  }

  startNewDB() {
    this.usuario = {
      email: "",
      logado: 0,
      gps: []
    };
    this.perguntas = [];
  }
  
  ionViewDidLoad() {
    return this.auth.getDB()
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM info WHERE id=?", [1])
        .then((result) => {
          if (result.rows.length == 1) {
            this.usuario = JSON.parse(result.rows.item(0).usuario);
            this.perguntas = JSON.parse(result.rows.item(0).perguntas);
            if (JSON.stringify(this.usuario.logado) && JSON.stringify(this.usuario.logado == 1)) {
              this.serviceProv.setUsuario(this.usuario);
              this.serviceProv.setPerguntas(this.perguntas);
              this.navCtrl.push(TabsPage, {
                usuario: this.usuario,
              });
            }
          }else {
            this.startNewDB();
            db.executeSql("INSERT INTO info (id,usuario, perguntas) VALUES (?,?,?)", [1, JSON.stringify(this.usuario), JSON.stringify(this.perguntas)])
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
    if (this.email == "") {
      let alert = this.alertCtrl.create({
        title: "Campo Vazio", subTitle: "Preencha o campo de Email!", buttons: ["OK"]
      });
      alert.present();
    } else {
      //this.serviceProv.setUsuario(JSON.stringify(this.usuario));
      this.navCtrl.push(TabsPage);
    }
  }

  exitApp() {
    this.platform.exitApp();
  }

}
