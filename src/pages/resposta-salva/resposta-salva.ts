import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RespostaSalvaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resposta-salva',
  templateUrl: 'resposta-salva.html',
})
export class RespostaSalvaPage {
  perguntasSalvas: any;
  index: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.perguntasSalvas = this.navParams.get('perguntasSalvas');
    this.index = this.navParams.get('index');
    console.log(this.perguntasSalvas[this.index]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespostaSalvaPage');
  }

}
