import { Component, ViewChild, ElementRef } from '@angular/core';
import {PopoverController, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-resultado-detail',
  templateUrl: 'resultado-detail.html',
})
export class ResultadoDetailPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  codigo: any = [];
  resposta: any = [];
  pergunta: any;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public popoverCtrl: PopoverController,
              public http: HttpClient,
              public loadingCtrl: LoadingController) {
    this.codigo = this.navParams.get('codigo');
    console.log(this.codigo);

    var post = {
      "cdPergunta": 633,
    }
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post("http://sisdedetizadora.com.br/pre/seam/resource/rest/baseConhecimentoMobile/abrirConteudoBase", JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
      .subscribe((data) => {
        this.resposta = data["resposta"];
        this.pergunta = data["pergunta"];
      })
    loading.dismiss();
  }
  
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverComponent, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoDetailPage');
  }

}
