import { Component, ViewChild, ElementRef } from '@angular/core';
import {PopoverController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';

@IonicPage()
@Component({
  selector: 'page-resultado-detail',
  templateUrl: 'resultado-detail.html',
})
export class ResultadoDetailPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  codigo: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.codigo = this.navParams.get('codigo');
    console.log(this.codigo);
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
