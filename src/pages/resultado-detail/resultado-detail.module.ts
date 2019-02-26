import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoDetailPage } from './resultado-detail';

@NgModule({
  declarations: [
    ResultadoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoDetailPage),
  ],
})
export class ResultadoDetailPageModule {}
